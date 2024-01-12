import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routers/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import "./MyClubs.css";
import "./AllClubs.css";
import "./ClubPage.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </AuthProvider>
);
