import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Route from "./route";

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Route />
    </div>
  </BrowserRouter>,
  document.getElementById("app")
);
