import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routers/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
