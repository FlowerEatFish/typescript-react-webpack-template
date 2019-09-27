import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import Container from "./container";

interface Props {}

const Router: FunctionComponent<Props> = props => (
  <Switch>
    <Route path="/" exact component={Container.Home} />
  </Switch>
);

export default Router;
