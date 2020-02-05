import React from "react";
import {Container, LinearProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";


function AppLoading() {
    const classes = useStyles();
    return(
        <Container maxWidth="xs">
            <div className={classes.loadingBox}>
                <Typography
                variant="h5"
                component="h1"
                className={classes.title}
                >
                    Aplikasi Penjualan
                </Typography>
                <LinearProgress/>
            </div>
        </Container>
    )
}

export default AppLoading;