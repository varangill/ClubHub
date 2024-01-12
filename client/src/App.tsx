import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routers/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./MyClubs.css";
import "./AllClubs.css";
import "./ClubPage.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
