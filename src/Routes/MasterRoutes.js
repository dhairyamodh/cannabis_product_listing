import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDetails from "../pages/ProductDetails";

const MasterRoutes = () => {

    return (
        <div>
            <Route
                exact
                path="/:cateName"
                component={ProductDetails}
            />

        </div>
    );
};

export default MasterRoutes;
