import React, {useRef, useState} from "react";
import {TextField} from "@material-ui/core";
import {useFirebase} from "../../../components/FirebaseProvider";
import {useSnackbar} from "notistack";
import isEmail from "validator/es/lib/isEmail";
import useStyles from "./styles/pengguna";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Pengguna() {
    const {user} = useFirebase();

    const [error, setError] = useState({
        displayName: '',
        email: '',
        password:''
    });

    const {enqueueSnackbar} = useSnackbar();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const classes = useStyles();

    const saveDisplayName = async (e) => {
        const displayName = displayNameRef.current.value;
        if (!displayName) {
            setError({
                    displayName: "Nama Wajib Di Isi"
                }
            )
        } else if (displayName !== user.displayName) {
            setError({
                displayName: ""
            })
            console.log(displayName);
            setIsSubmitting(true);
            await user.updateProfile({
                displayName
            })
            setIsSubmitting(false);
            enqueueSnackbar("Data Pengguna Berhasil Di Update!", {variant: "success"});
        }

    }

    const updateEmail = async (e) => {
        const email = emailRef.current.value;
        if (!email) {
            setError({
                email: "Email Wajib Di Isi"
            })
        } else if (!isEmail(email)) {
            setError({
                email: "Email Tidak Valid"
            })
        } else if (email !== user.email) {
            setError({
                email: ''
            });
            setIsSubmitting(true)
            try {
                await user.updateEmail(email)
                enqueueSnackbar("EMail Berhasil Diperbarui", {variant: 'success'});
                setIsSubmitting(false)
            } catch (e) {
                let emailError = '';
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        emailError = "Email Sudah digunakan Pengguna Lain";
                        break;
                    case 'auth/invalid-email':
                        emailError = "Email tidak valid";
                        break;
                    case 'auth/requires-recent-login':
                        emailError = "Silahkan logout, Kemudaian Login Kembali untuk memperbarui email";
                        break;
                    default:
                        emailError = "Terjadi Kesalahan silahkan coba kembali";
                        break;
                }
                setError({
                    email: emailError
                })
            }
        }
    }
    const handlerSendEmail = async (e) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/login`
        };
        setIsSubmitting(true)
        await user.sendEmailVerification(actionCodeSettings);
        enqueueSnackbar(`Email Verifikasi Telah Dikirim ${emailRef.current.value}`, {
            variant: 'success'
        })
        setIsSubmitting(false);
    }

    const updatePassword = async (e) => {
        const password = passwordRef.current.value;
        if (!password){
            setError({
                password:"Password Wajib Di Isi"
            })
        }else{
            setIsSubmitting(true)
            try{
                await user.updatePassword(password);
                enqueueSnackbar("Password Berhasil Di Update",{
                    variant:"success"
                })
            }catch (e) {
                let errorPasswrod = '';
                switch (e.code) {
                    case 'auth/week-password':
                        errorPasswrod = "Password Terlalu Lemah"
                        break;
                    case 'auth/requires-recent-login':
                        errorPasswrod = "Silahkan Logout, Kemudian Login Kembali untuk membarui password ";
                        break;
                    default:
                        errorPasswrod = "Terjadi Kesalahan silahkan coba kembali";
                        break;
                }
                setError({
                    password:errorPasswrod
                })
            }
            setIsSubmitting(false)
        }
    }


    return <div className={classes.pengaturanPenggun}>
        <TextField
            id="displayName"
            name="displyName"
            label="Nama"
            margin="normal"
            defaultValue={user.displayName}
            inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName ? true : false}
        />
        <TextField
            id="email"
            name="email"
            label="Email"
            margin="normal"
            type="email"
            defaultValue={user.email}
            inputProps={{
                ref: emailRef,
                onBlur: updateEmail
            }}
            disabled={isSubmitting}
            helperText={error.email}
            error={error.email ? true : false}
        />
        {
            user.emailVerified ?
                <Typography variant="subtitle1"
                            color="primary"
                >
                    Email Sudah Di Terverifikasi
                </Typography>
                :
                <Button
                    variant="outlined"
                    onClick={handlerSendEmail}
                    disabled={isSubmitting}
                >
                    Kirim Email Verifikasi
                </Button>
        }

        <TextField
            id="passowrd"
            name="password"
            type="password"
            label="Password"
            margin="normal"
            inputProps={{
                ref: passwordRef,
                onBlur: updatePassword
            }}
            disabled={isSubmitting}
            autoComplete="new-password"
            helperText={error.password}
            error={error.password?true:false}
        />
    </div>
}

export default Pengguna;