import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import Page from "./page";

const Router: FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Page.Home} />
  </Switch>
);

export default Router;
