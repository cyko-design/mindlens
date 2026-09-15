import test from "node:test";
import assert from "node:assert/strict";
import {
  initialSession,
  reducer,
  restoreSession,
} from "../src/domain/session.js";
import { calculate } from "../src/domain/scoring.js";

test("review preserves all answers, invalidates derived results and reruns completion", () => {
  const answers = [...Array(6).fill(2), ...Array(16).fill(0)];
  const completed = {
    ...initialSession(),
    adult: true,
    terms: true,
    answers,
    position: 5,
    completed: true,
    buildingStarted: 1,
    resultTab: 1,
    openAreas: [2],
  };
  const review = reducer(completed, { type: "review" });
  assert.deepEqual(review.answers, answers);
  assert.equal(review.position, 5);
  assert.equal(review.completed, false);
  assert.equal(review.buildingStarted, null);
  const edited = reducer(review, { type: "answer", value: 0 });
  // A single answer crosses the unchanged 40% primary classification threshold.
  assert.equal(calculate(answers).classification, 1);
  assert.equal(calculate(edited.answers).classification, 0);
  const fresh = reducer(edited, { type: "complete" });
  assert.equal(fresh.completed, true);
  assert.ok(fresh.buildingStarted > completed.buildingStarted);
  assert.notEqual(calculate(fresh.answers).adhd, calculate(answers).adhd);
  assert.deepEqual(
    restoreSession(JSON.stringify(fresh)).answers,
    fresh.answers,
  );
});
test("retake clears the complete assessment lifecycle and preserves unrelated preferences", () => {
  const old = {
    ...initialSession(),
    adult: true,
    terms: true,
    answers: Array(22).fill(4),
    position: 21,
    completed: true,
    buildingStarted: 1,
    resultTab: 1,
    openAreas: [4],
    city: "Taipei",
    market: "China",
    region: "Taipei",
    supportType: 2,
  };
  let s = reducer(old, { type: "retake" });
  assert.deepEqual(s.answers, Array(22).fill(null));
  assert.equal(s.position, 0);
  assert.equal(s.completed, false);
  assert.equal(s.buildingStarted, null);
  assert.equal(s.resultTab, 0);
  assert.deepEqual(s.openAreas, []);
  for (const k of ["adult", "terms", "city", "market", "region", "supportType"])
    assert.equal(s[k], old[k]);
  for (let i = 0; i < 22; i++) {
    assert.equal(reducer(s, { type: "complete" }).completed, false);
    s = reducer(s, { type: "patch", patch: { position: i } });
    s = reducer(s, { type: "answer", value: 0 });
  }
  s = reducer(s, { type: "complete" });
  assert.equal(s.completed, true);
  assert.equal(calculate(s.answers).classification, 0);
});
test("same-answer review remains editable; invalid values cannot enter state", () => {
  const s = {
    ...initialSession(),
    answers: Array(22).fill(2),
    completed: true,
    buildingStarted: 1,
  };
  const same = reducer(s, { type: "answer", value: 2 });
  assert.deepEqual(same.answers, s.answers);
  assert.equal(same.completed, false);
  assert.equal(reducer(s, { type: "answer", value: 8 }), s);
});
