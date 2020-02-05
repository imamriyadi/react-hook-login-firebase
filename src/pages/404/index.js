import React from "react";
import {Container, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import useStyles from "./style";

function NotFound() {
      const classes = useStyles();
    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">Halaman Tidak Di Temukan</Typography>
                <Typography variant="h3">404</Typography>
                <Typography component={Link}>Kembali Ke Beranda</Typography>
            </Paper>
        </Container>
    )
}

export default NotFound;