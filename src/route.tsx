import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import Container from "./container";

const Router: FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Container.Home} />
  </Switch>
);

export default Router;
