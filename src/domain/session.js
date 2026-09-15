import { validAnswer, validAnswers } from "./scoring.js";
export const SESSION_KEY = "mindlens.session.v1";
export const initialSession = () => ({
  version: 1,
  adult: false,
  terms: false,
  answers: Array(22).fill(null),
  position: 0,
  completed: false,
  buildingStarted: null,
  resultTab: 0,
  openAreas: [],
  supportType: 0,
  city: "Kuala Lumpur/Klang Valley",
  market: "Malaysia",
  region: "Mainland China",
});
export function restoreSession(raw) {
  try {
    const s = JSON.parse(raw);
    if (
      !s ||
      s.version !== 1 ||
      typeof s.adult !== "boolean" ||
      typeof s.terms !== "boolean" ||
      !Array.isArray(s.answers) ||
      s.answers.length !== 22 ||
      !s.answers.every((a) => a === null || validAnswer(a)) ||
      !Number.isInteger(s.position) ||
      s.position < 0 ||
      s.position > 21 ||
      typeof s.completed !== "boolean"
    )
      return initialSession();
    if (
      s.completed &&
      (!s.adult ||
        !s.terms ||
        !validAnswers(s.answers) ||
        !Number.isFinite(s.buildingStarted) ||
        s.buildingStarted <= 0 ||
        s.buildingStarted > Date.now())
    )
      return initialSession();
    return {
      ...initialSession(),
      ...s,
      openAreas: Array.isArray(s.openAreas)
        ? s.openAreas
            .filter((n) => Number.isInteger(n) && n >= 0 && n < 7)
            .slice(0, 1)
        : [],
      resultTab: s.resultTab === 1 ? 1 : 0,
      supportType: [0, 1, 2].includes(s.supportType) ? s.supportType : 0,
    };
  } catch {
    return initialSession();
  }
}
export function reducer(s, action) {
  switch (action.type) {
    case "patch":
      return { ...s, ...action.patch };
    case "review":
      return {
        ...s,
        completed: false,
        buildingStarted: null,
        resultTab: 0,
        openAreas: [],
      };
    case "answer": {
      if (!validAnswer(action.value)) return s;
      const answers = [...s.answers];
      answers[s.position] = action.value;
      return {
        ...s,
        answers,
        completed: false,
        buildingStarted: null,
        resultTab: 0,
      };
    }
    case "complete":
      return s.adult && s.terms && validAnswers(s.answers)
        ? {
            ...s,
            completed: true,
            buildingStarted: Date.now(),
            resultTab: 0,
            openAreas: [],
          }
        : s;
    case "retake":
      return {
        ...s,
        answers: Array(22).fill(null),
        position: 0,
        completed: false,
        buildingStarted: null,
        resultTab: 0,
        openAreas: [],
      };
    default:
      return s;
  }
}
