import React, { FunctionComponent } from "react";

import config from "../config";

interface Props {}

const HomeContainer: FunctionComponent<Props> = props => {
  return <h2>{config.projectTitle}</h2>;
};

export default HomeContainer;
