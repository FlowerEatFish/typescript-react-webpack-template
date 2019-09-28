import React, { FunctionComponent } from "react";

import config from "../config";

const HomeContainer: FunctionComponent = () => {
  return <h1>{config.projectTitle}</h1>;
};

export default HomeContainer;
