import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LegalPage } from "./components/LegalPage";

const rootEl = document.getElementById("root");
if (rootEl) {
  const path = window.location.pathname.replace(/\/$/, '');
  const legal = path === '/privacy-policy' ? 'privacy' : path === '/terms-and-conditions' ? 'terms' : path === '/refund-policy' ? 'refund' : null;
  ReactDOM.createRoot(rootEl).render(legal ? <LegalPage kind={legal} /> : <App />);
}
