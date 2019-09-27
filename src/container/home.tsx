import React, { FunctionComponent } from "react";

import config from "../config";

const HomeContainer: FunctionComponent = () => {
  return <h2>{config.projectTitle}</h2>;
};

export default HomeContainer;
