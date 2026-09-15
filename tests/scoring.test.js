import test from "node:test";
import assert from "node:assert/strict";
import { calculate, band, validAnswers, AREAS } from "../src/domain/scoring.js";
import {
  initialSession,
  restoreSession,
  reducer,
} from "../src/domain/session.js";
test("all four classifications, primary/shared separation and extrema", () => {
  for (const [a, b, c, classification, combined] of [
    [0, 0, 0, 0, 0],
    [4, 0, 4, 1, 20],
    [0, 4, 4, 2, 20],
    [4, 4, 4, 3, 100],
    [0, 0, 4, 0, 20],
    [2, 2, 2, 3, 50],
  ]) {
    const result = calculate([
      ...Array(7).fill(a),
      ...Array(10).fill(b),
      ...Array(5).fill(c),
    ]);
    assert.equal(result.classification, classification);
    assert.equal(result.combined, combined);
  }
});
test("unrounded bands and classification thresholds", () => {
  assert.deepEqual(
    [0, 39, 39.999, 40, 69, 69.999, 70, 100].map(band),
    [0, 0, 0, 1, 1, 1, 2, 2],
  );
  const lower = [4, 4, 3, 0, 0, 0, 0, ...Array(15).fill(0)];
  assert.equal(calculate(lower).classification, 0);
  lower[3] = 1;
  assert.equal(calculate(lower).classification, 1);
});
test("every area uses only its mapped items", () => {
  for (let area = 0; area < 7; area++) {
    const answers = Array(22).fill(0);
    const [start, end] = AREAS[area];
    answers.fill(4, start, end);
    assert.deepEqual(
      calculate(answers).areas,
      Array.from({ length: 7 }, (_, i) => (i === area ? 100 : 0)),
    );
  }
});
test("invalid/incomplete/sparse responses cannot produce a result", () => {
  for (const answers of [
    null,
    [],
    Array(22),
    Array(22).fill(null),
    Array(22).fill("4"),
    Array(22).fill(5),
    Array(22).fill(-1),
    Array(22).fill(1.5),
  ]) {
    assert.equal(validAnswers(answers), false);
    assert.throws(() => calculate(answers));
  }
});
test("session corruption and incoherent completion restart safely", () => {
  for (const raw of [
    "bad",
    "null",
    "{}",
    JSON.stringify({ ...initialSession(), completed: true }),
  ])
    assert.deepEqual(restoreSession(raw), initialSession());
  const s = {
    ...initialSession(),
    adult: true,
    terms: true,
    answers: Array(22).fill(3),
    completed: true,
  };
  assert.equal(restoreSession(JSON.stringify(s)).completed, false);
  s.buildingStarted = Date.now();
  assert.equal(restoreSession(JSON.stringify(s)).completed, true);
});
test("editing invalidates completion and retake clears assessment but preserves eligibility", () => {
  const s = {
    ...initialSession(),
    adult: true,
    terms: true,
    answers: Array(22).fill(3),
    completed: true,
    position: 10,
    openAreas: [2],
    resultTab: 1,
  };
  assert.equal(reducer(s, { type: "answer", value: 0 }).completed, false);
  assert.deepEqual(reducer(s, { type: "retake" }), {...initialSession(), adult: true, terms: true});
  assert.equal(
    reducer(initialSession(), { type: "complete" }).completed,
    false,
  );
});
