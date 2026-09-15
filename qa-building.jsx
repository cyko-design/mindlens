// Development-only visual fixture. Production Building owns the real timer.
import React from "react";
import { createRoot } from "react-dom/client";
import { Runtime } from "./src/hooks/runtime.jsx";
import { BuildingContent } from "./src/pages/flow.jsx";
import "./src/styles.css";
createRoot(document.getElementById("root")).render(
  <Runtime>
    <div className="mobile-app">
      <BuildingContent elapsed={400} />
    </div>
  </Runtime>,
);
