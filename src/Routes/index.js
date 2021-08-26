import React from "react";
import MasterRoutes from "./MasterRoutes";
import { Route } from "react-router-dom";

const HomeRoutes = () => {
  return (
    <React.Fragment>
      <div>
        <Route path="/" component={MasterRoutes} />
      </div>
    </React.Fragment>
  )

};
export default HomeRoutes;
