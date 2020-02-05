import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./style";
import {Container, TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Link, Redirect} from "react-router-dom";
import {isEmail} from "validator";
import {useFirebase} from "../../components/FirebaseProvider";
import AppLoading from "../../components/AppLoading";

function Login(props) {
    const  {location} =  props;
    const classes = useStyles();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(
        {
            email: "",
            password: ""
        }
    );

    const [isSubbmiting, setIsSubbmiting] = useState(false);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError(
            {
                ...error,
                [e.target.name]: ''
            }
        )
    }

    const validate = () => {
        const newError = {...error}

        if (!form.email) {
            newError.email = "Email Wajib Di isi!";
        } else if (!isEmail(form.email)) {
            newError.email = "Email Tidak Valid!";
        }

        if (!form.password) {
            newError.password = "Password Wajib Di isi!";
        }

        return newError;
    }

    const {auth, user, loading} = useFirebase();

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(error => error !== '')) {
            setError(findErrors);
        } else {
            try {
                setIsSubbmiting(true);
                await auth.signInWithEmailAndPassword(form.email, form.password)
            } catch (e) {
                const newError = {};
                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = "Email Tidak Terdaftar!";
                        break;
                    case 'auth/invalid-email':
                        newError.email = "Email Tidak Valid!";
                        break;
                    case 'auth/wrong-password':
                        newError.password = "Password Salah";
                        break;
                    case 'auth/user-disabled':
                        newError.email = "User Terblokir!";
                        break;
                    default:
                        newError.email = "Terjadi Kesalahan Silahkan Coba Lagi!";
                        break;
                }

                setError(newError);
                setIsSubbmiting(false);
            }
        }
    }

    if (loading) {
        return <AppLoading/>
    }
    if (user) {
        const redirectTo = location.state &&
            location.state.from &&
            location.state.from.pathname?
            location.state.from.pathname :'/';
        console.log(redirectTo);
        return <Redirect to={redirectTo}  />

    }
    console.log(user);
    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>Login User</Typography>
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    margin="normal"
                    label="Alamat Email"
                    fullWidth
                    required
                    value={form.email}
                    onChange={handleChange}
                    helperText={error.email}
                    error={error.email ? true : false}
                    disabled={isSubbmiting}
                />

                <TextField
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    margin="normal"
                    fullWidth
                    required
                    value={form.password}
                    onChange={handleChange}
                    helperText={error.password}
                    error={error.password ? true : false}
                    disabled={isSubbmiting}
                />

                <Grid container>
                    <Grid item xs>
                        <Button type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                disabled={isSubbmiting}
                        >Login</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isSubbmiting}
                            component={Link}
                            variant="contained"
                            size="large"
                            to="/registrasi"
                        > Daftar
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.forgotPassowrd}>
                    <Typography component={Link} to="/lupa-password">Lupa Password</Typography>

                </div>
            </form>
        </Paper>
    </Container>
}

export default Login;