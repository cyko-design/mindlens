import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../src/styles.css");

test("shared cascade excludes superseded Results and assurance patches", () => {
  assert.doesNotMatch(css, /!important|:root:has|results-your/);
  const title = css.match(/\.page-title\s*\{([^}]+)\}/)?.[1];
  assert.match(title, /font-size:\s*20px/);
  assert.match(title, /font-weight:\s*500/);
  const trustTitle = css.match(/\.trust h2\s*\{([^}]+)\}/)?.[1];
  assert.ok(trustTitle);
  assert.doesNotMatch(trustTitle, /(?:^|[;\n])\s*(?:min-)?height:/);
  assert.doesNotMatch(
    css.match(/\.results \.actions[^}]*\}/)?.[0] || "",
    /width:\s*\d+%/,
  );
});

test("footer and centre waves remain distinct reusable exported assets", () => {
  const footer = read("../public/assets/footer-wave.svg");
  const profile = read("../public/assets/profile-wave.svg");
  assert.match(footer, /viewBox="0 0 852 374"/);
  assert.match(profile, /viewBox="0 0 852 271"/);
  assert.notEqual(footer, profile);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none/);
});
