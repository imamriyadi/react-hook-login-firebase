import React from "react";
import {Route, Switch} from "react-router-dom";
import Pengaturan from "./pengaturan";
import Product from "./produk";
import Transaksi from "./transaksi";
import Home from "./home";

function Private() {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/pengaturan" component={Pengaturan}/>
            <Route path="/produk" component={Product}/>
            <Route path="/transaksi" component={Transaksi}/>
        </Switch>
    )
}

export default Private;