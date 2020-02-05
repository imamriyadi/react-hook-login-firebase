import React from "react";
import {Route, Switch} from "react-router-dom";
import EditProduk from "./edit";
import ProdukGrid from "./grid";

function Product() {
        return(
            <Switch>
                <Route path="/produk/edit/:produkId" component={EditProduk}/>
                <Route component={ProdukGrid}/>
            </Switch>
        )
}

export default Product;