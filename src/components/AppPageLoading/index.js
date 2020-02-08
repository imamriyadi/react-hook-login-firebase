import React from "react";
import useStyles from "./styles";
import {CircularProgress} from "@material-ui/core";


function AppLoading() {
    const classes = useStyles();
    return(
        <div className={classes.loadingBox}>
            <CircularProgress/>
        </div>
    )
}

export default AppLoading;