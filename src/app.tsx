import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Route from "./route";
import "./tailwind.css"; // Make it by PostCSS

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Route />
    </div>
  </BrowserRouter>,
  document.getElementById("app")
);
