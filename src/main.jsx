import React from "react";
import { createRoot } from "react-dom/client";
import { Runtime, useApp, useMedia } from "./hooks/runtime.jsx";
import {
  Home,
  Info,
  Questionnaire,
  Building,
  Results,
  Explore,
  Together,
  Professional,
  Support,
  Desktop,
} from "./pages/flow.jsx";
import "./styles.css";
function App() {
  const { route } = useApp();
  const mobile = useMedia(
    "(max-width: 767px), (max-height: 600px) and (pointer: coarse)",
  );
  if (!mobile) return <Desktop />;
  const pages = {
    home: <Home />,
    terms: <Info terms />,
    accuracy: <Info />,
    questionnaire: <Questionnaire />,
    building: <Building />,
    results: <Results />,
    explore: <Explore />,
    together: <Together />,
    professional: <Professional />,
    support: <Support />,
  };
  return <div className="mobile-app">{pages[route] || pages.home}</div>;
}
createRoot(document.getElementById("root")).render(
  <Runtime>
    <App />
  </Runtime>,
);
