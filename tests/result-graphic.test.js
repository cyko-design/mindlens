import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { initialSession, SESSION_KEY } from "../src/domain/session.js";
import { readFileSync } from "node:fs";

test("all four Results titles and graphic states share the final classification", async () => {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  try {
    const { Runtime } = await server.ssrLoadModule("/src/hooks/runtime.jsx");
    const { Results } = await server.ssrLoadModule("/src/pages/flow.jsx");
    const strings = JSON.parse(
      readFileSync(new URL("../src/locales/en.json", import.meta.url)),
    );
    globalThis.location = { hash: "#results" };
    for (let classification = 0; classification < 4; classification++) {
      const answers = [
        ...Array(7).fill(classification & 1 ? 4 : 0),
        ...Array(10).fill(classification & 2 ? 4 : 0),
        ...Array(5).fill(0),
      ];
      const session = {
        ...initialSession(),
        adult: true,
        terms: true,
        completed: true,
        answers,
        buildingStarted: Date.now() - 2000,
      };
      globalThis.sessionStorage = {
        getItem: (key) =>
          key === SESSION_KEY ? JSON.stringify(session) : "en",
      };
      const html = renderToStaticMarkup(
        React.createElement(Runtime, null, React.createElement(Results)),
      );
      assert.ok(html.includes(`data-classification="${classification}"`));
      assert.ok(
        html.includes(
          `<h1 tabindex="-1">${strings.results[classification].name}</h1>`,
        ),
      );
      assert.ok(
        html.includes(
          `result-trait-adhd" data-emphasis="${classification & 1 ? "strong" : "subdued"}"`,
        ),
      );
      assert.ok(
        html.includes(
          `result-trait-asd" data-emphasis="${classification & 2 ? "strong" : "subdued"}"`,
        ),
      );
      assert.equal(
        (
          html
            .split('class="result-circles"')[1]
            .split("</svg>")[0]
            .match(/r="23"/g) || []
        ).length,
        2,
      );
    }
  } finally {
    await server.close();
    delete globalThis.location;
    delete globalThis.sessionStorage;
  }
});
