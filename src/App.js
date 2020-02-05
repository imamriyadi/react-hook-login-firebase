import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registrasi from "./pages/registrasi";
import Login from "./pages/login";
import NotFound from "./pages/404";
import LupaPassword from "./pages/lupa-password";
import Private from "./pages/private";
import PrivateRoute from "./components/PrivateRoute";
import FirebaseProvider from "./components/FirebaseProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./config/theme";
import {SnackbarProvider} from  'notistack';

function App() {
    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3} autoHideDuration={3000}>

                <FirebaseProvider>
                    <Router>
                        <Switch>
                            <PrivateRoute path="/" exact component={Private}/>
                            <PrivateRoute path="/pengaturan" component={Private}/>
                            <PrivateRoute path="/produk" component={Private}/>
                            <PrivateRoute path="/transaksi" component={Private}/>
                            <Route path="/registrasi" component={Registrasi}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/lupa-password" component={LupaPassword}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Router>
                </FirebaseProvider>

                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
