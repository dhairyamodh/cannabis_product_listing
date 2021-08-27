import React from "react";
import { Redirect, Route } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";
import home from "../pages/home";

const MasterRoutes = () => {

    return (
        <div>
            <Route
                exact
                path="/"
                render={() => <Redirect to="/cannabis_product_listing" />}
            />
            <Route
                exact
                path="/cannabis_product_listing"
                component={home}
            />
            <Route
                exact
                path="/cannabis_product_listing/:cateName"
                component={ProductDetails}
            />

        </div>
    );
};

export default MasterRoutes;
