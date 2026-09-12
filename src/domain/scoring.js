export const THRESHOLDS = Object.freeze({ moderate: 40, higher: 70 });
export const WEIGHTS = Object.freeze({ primary: 0.8, shared: 0.2 });
export const AREAS = Object.freeze([
  [0, 4],
  [4, 7],
  [7, 11],
  [11, 14],
  [14, 17],
  [17, 20],
  [20, 22],
]);
export const band = (score) =>
  score < THRESHOLDS.moderate ? 0 : score < THRESHOLDS.higher ? 1 : 2;
export const validAnswer = (value) =>
  Number.isInteger(value) && value >= 0 && value <= 4;
export const validAnswers = (answers) =>
  Array.isArray(answers) &&
  answers.length === 22 &&
  Array.from(answers).every(validAnswer);
export function calculate(answers) {
  if (!validAnswers(answers))
    throw new TypeError("Exactly 22 valid responses are required");
  const percentage = (start, end) =>
    (answers.slice(start, end).reduce((sum, n) => sum + n, 0) /
      ((end - start) * 4)) *
    100;
  const adhd = percentage(0, 7),
    asd = percentage(7, 17),
    shared = percentage(17, 22);
  const classification =
    (adhd >= THRESHOLDS.moderate ? 1 : 0) +
    (asd >= THRESHOLDS.moderate ? 2 : 0);
  return {
    adhd,
    asd,
    shared,
    combined: WEIGHTS.primary * Math.min(adhd, asd) + WEIGHTS.shared * shared,
    classification,
    areas: AREAS.map(([start, end]) => percentage(start, end)),
  };
}
