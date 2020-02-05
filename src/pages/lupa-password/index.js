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
import {useSnackbar} from "notistack";

function LupaPassword() {
    const classes = useStyles();

    const [form, setForm] = useState({
        email: ""
    });

    const [error, setError] = useState(
        {
            email: ""
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


        return newError;
    }

    const {auth, user, loading} = useFirebase();

    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(error => error !== '')) {
            setError(findErrors);
        } else {
            try {
                setIsSubbmiting(true);
                const actionCodeSettings = {
                    url: `${window.location.origin}/login`
                }
                await auth.sendPasswordResetEmail(form.email, actionCodeSettings);
                enqueueSnackbar(`Cek Kotak Masuk email:" ${form.email}, Untuk Merubah Password`,{
                    variant:"success"
                })
                setIsSubbmiting(false);
            } catch (e) {
                const newError = {};
                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = "Email Tidak Terdaftar!";
                        break;
                    case 'auth/invalid-email':
                        newError.email = "Email Tidak Valid!";
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
        return <Redirect to="/"/>
    }
    console.log(user);
    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>Lupa Passowrd</Typography>
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

                <Grid container>
                    <Grid item xs>
                        <Button type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                disabled={isSubbmiting}
                        >Kirim</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isSubbmiting}
                            component={Link}
                            variant="contained"
                            size="large"
                            to="/login"
                        > Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
}

export default LupaPassword;