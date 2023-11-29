import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("no container to render to");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <h1>Hello world</h1>
  </React.StrictMode>,
);
