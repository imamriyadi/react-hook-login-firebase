import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useFirebase} from "../../../components/FirebaseProvider";
import {useDocument} from "react-firebase-hooks/firestore";
import AppLoading from "../../../components/AppPageLoading";
import {useSnackbar} from "notistack";

function EditProduk({match}) {

    const {firestore, user} = useFirebase();
    const {enqueueSnackbar} = useSnackbar();
    const produkDoc = firestore.doc(`toko/${user.uid}/produk/${match.params.produkId}`);
    const [snapshot, loading] = useDocument(produkDoc);
    const [form, setForm] = useState({
        name: "",
        sku: "",
        harga: 0,
        stok: 0,
        description: ""
    });
    const [error, setError] = useState({
        name: "",
        sku: "",
        harga: "",
        stok: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (snapshot) {
            setForm(currentForm => ({
                ...currentForm,
                ...snapshot.data()
            }));
        }
    }, [snapshot]);
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    if (loading) {
        return <AppLoading/>
    }

    const validate = () => {
        const newError = {...error}
        if (!form.name) {
            newError.name = "Nama Wajib DiIsi";
        }

        if (!form.harga) {
            newError.harga = "Harga Wajib Diisi";
        }

        if (!form.stok) {
            newError.stok = "Stok Wajib Diisi";
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findError = validate();

        if (Object.values(findError).some(error => error !== '')) {
            setError(findError);
        } else {
            setIsSubmitting(true);
            try {
                await produkDoc.set(form, {merge: true});
                enqueueSnackbar("Berhasil Disimpan", {variant: "success"})
            } catch (e) {
                enqueueSnackbar(e.message, {variant: "error"})

            }
            setIsSubmitting(false);
        }
    }

    return <div>
        <Typography variant="h5" component="h1">Edit Produk : {form.nama}</Typography>
        <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={6}>
                <form id="produk-form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="nama"
                        name="name"
                        label="Nama Produk"
                        margin="normal"
                        required
                        fullWidth
                        value={form.name}
                        helperText={error.nama}
                        error={error.nama ? true : false}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    <TextField
                        id="sku"
                        name="sku"
                        label="Sku Produk"
                        fullWidth
                        value={form.sku}
                        error={error.sku ? true : false}
                        helperText={error.sku}
                        onChange={handleChange}
                        margin="normal"
                        disabled={isSubmitting}
                    />
                    <TextField
                        id="stok"
                        name="stok"
                        label="Stok Produk"
                        fullWidth
                        value={form.stok}
                        error={error.stok ? true : false}
                        helperText={error.stok}
                        onChange={handleChange}
                        rowsMax={3}
                        required
                        margin="normal"
                        disabled={isSubmitting}
                    />

                    <TextField
                        id="harga"
                        name="harga"
                        label="Harga Produk"
                        fullWidth
                        value={form.harga}
                        error={error.harga ? true : false}
                        helperText={error.harga}
                        onChange={handleChange}
                        multiline
                        required
                        rowsMax={3}
                        margin="normal"
                        disabled={isSubmitting}
                    />
                    <TextField
                        id="description"
                        name="description"
                        label="Description Produk"
                        fullWidth
                        value={form.description}
                        error={error.description ? true : false}
                        helperText={error.description}
                        margin="normal"
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </form>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography>Upload Gambar</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button disabled={isSubmitting} form="produk-form" type="submit" color="primary"
                        variant="contained">Simpan</Button>
            </Grid>
        </Grid>
    </div>
}

export default EditProduk;