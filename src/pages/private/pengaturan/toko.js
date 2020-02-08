import React, {useEffect, useState} from "react";
import {TextField} from "@material-ui/core";
import useStyle from "./styles/toko";
import Button from "@material-ui/core/Button";
import isURL from "validator/es/lib/isURL";
import {useFirebase} from "../../../components/FirebaseProvider";
import {useSnackbar} from "notistack";
import {useDocument} from "react-firebase-hooks/firestore";
import AppLoading from "../../../components/AppPageLoading";
import {Prompt} from "react-router-dom";

function Toko() {
    const [form, setFrom] = useState({
        name: "",
        alamat: "",
        telp: "",
        website: ""
    });

    const [error, setError] = useState({
        name: "",
        alamat: "",
        telp: "",
        website: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSomethingChange,setIsSomethingChange]= useState(false);

    const {firestore, user} = useFirebase();

    const tokoDoc = firestore.doc(`toko/${user.uid}`);
    const [snapshot, loading] = useDocument(tokoDoc);

    useEffect(()=>{
        if (snapshot){
            setFrom(snapshot.data());
        }
    },[snapshot]);
    const {enqueueSnackbar} = useSnackbar();
    const handleChange = e => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        });

        setError({
            [e.target.name]:''
        });

        setIsSomethingChange(true);
    }

    const classes = useStyle();

    const validate = () => {
        const newError = {...error};
        if (!form.name) {
            newError.name = "Nama Wajib Di isi";
        }

        if (!form.alamat) {
            newError.alamat = "Alamat Wajib Di Isi";
        }

        if (!form.telp) {
            newError.telp = "Telp Wajib Diisi";
        }

        if (!form.website) {
            newError.website = "Website Wajib Diisi";
        } else if (!isURL(form.website)) {
            newError.website = "Website Tidak Valid";
        }
        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();
        if (Object.values(findErrors).some(error => error !== "")) {
            setError(findErrors);
        } else {
            setIsSubmitting(true);
            try {
                await tokoDoc.set(form, {merge: true});
                setIsSomethingChange(false);
                enqueueSnackbar("Data Toko Berhasil Disimpan", {variant: "success"})
            } catch (e) {
                console.log(e);
            }
            setIsSubmitting(false)
        }
    }


    if(loading){
        return <AppLoading/>
    }

    return <div className={classes.pengaturanToko}>
        <form onSubmit={handleSubmit} noValidate>
            <TextField
                id="name"
                name="name"
                label="Nama Lengkap"
                margin="normal"
                disabled={isSubmitting}
                value={form.name}
                onChange={handleChange}
                error={error.name ? true : false}
                helperText={error.name}
                fullWidth
                required
            />
            <TextField
                id="alamat"
                name="alamat"
                label="Alamat"
                margin="normal"
                onChange={handleChange}
                multiline
                rowsMax={3}
                value={form.alamat}
                helperText={error.alamat}
                error={error.alamat ? true : false}
                disabled={isSubmitting}
                fullWidth
                required
            />
            <TextField
                id="telp"
                name="telp"
                label="Telp"
                margin="normal"
                onChange={handleChange}
                value={form.telp}
                helperText={error.telp}
                error={error.telp ? true : false}
                disabled={isSubmitting}
                fullWidth
                required
            />
            <TextField
                id="website"
                name="website"
                label="Website"
                margin="normal"
                onChange={handleChange}
                value={form.website}
                helperText={error.website}
                error={error.website ? true : false}
                disabled={isSubmitting}
                fullWidth
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isSomethingChange}
                className={classes.actionButton}
            >Simpan</Button>
        </form>
        <Prompt
            when={isSomethingChange}
            message="Terdapat Perubahan yang belum disimpan, apakah anda yakin ingin meninggalkan halaman ini ?"
        />
    </div>
}

export default Toko;