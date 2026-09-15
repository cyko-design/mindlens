import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const json = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const en = json("../src/locales/en.json"),
  zh = json("../src/locales/zh-CN.json");
function keys(o, p = "") {
  return Object.entries(o)
    .flatMap(([k, v]) =>
      Array.isArray(v)
        ? [p + k]
        : v && typeof v === "object"
          ? keys(v, p + k + ".")
          : p + k,
    )
    .sort();
}
test("English/Chinese key parity and complete question and interpretation matrix", () => {
  assert.deepEqual(keys(en), keys(zh));
  assert.equal(en.questions.length, 22);
  assert.equal(zh.questions.length, 22);
  for (const locale of [en, zh]) {
    assert.equal(locale.areas.length, 7);
    for (const a of locale.areas) {
      assert.equal(a.levels.length, 3);
      for (const l of a.levels) {
        assert.ok(l.text);
        assert.equal(l.examples.length, 3);
      }
    }
    assert.equal(locale.summaries.length, 4);
    assert.equal(locale.scoreTexts.length, 3);
    for (const interpretation of locale.scoreTexts) {
      assert.ok(
        interpretation.trim(),
        "Every score band needs production interpretation copy",
      );
    }
  }
});
test("approved provider links are actual destinations and unique assessment records", () => {
  const providers = json("../src/data/assessment.json");
  assert.equal(providers.length, 15);
  for (const p of providers) {
    assert.ok(p.name && p.address);
    assert.match(p.url, /^https?:\/\//);
    assert.ok(!p.url.includes("google.com"));
  }
  assert.equal(new Set(providers.map((p) => p.id)).size, 15);
});
const assetHashes = {
  "bmc-button.svg":
    "bd94345b3e5e0c4b624c3929d3779ddd6c27fab63f07b4827c399168e4effaa7",
  "purple_thanks.gif":
    "8b6d5ddc52814be203d86da1a6f6dc939310bf08a82564dfd0d469d3b4c17698",
};
test("immutable asset content remains supplied", () => {
  for (const name of ["bmc-button.svg", "purple_thanks.gif"])
    assert.equal(
      createHash("sha256")
        .update(
          readFileSync(new URL("../public/assets/" + name, import.meta.url)),
        )
        .digest("hex"),
      assetHashes[name],
    );
});
