import React, {useState} from "react";
import PropTypes from 'prop-types';
import {DialogTitle} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useFirebase} from "../../../components/FirebaseProvider";
import {withRouter} from "react-router-dom";

function AddDialog({history,open,handleClose}) {

    const {firestore,user} = useFirebase();
    const produkCol = firestore.collection(`toko/${user.uid}/produk`);

    const [name,setName] = useState('');
    const [error,setError] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);
    const handleSimpan = async e =>{
        setIsSubmitting(true);
        try{
            if(!name){
                throw new Error("Nama Wajib Diisi");
            }

            const produkBaru  = await produkCol.add({name});
            history.push(`produk/edit/${produkBaru.id}`)
        }catch (e) {
            setError(e.message);
        }
        setIsSubmitting(false);
    }
    return <Dialog disableBackdropClick={isSubmitting} disableEscapeKeyDown={isSubmitting} open={open} onClose={handleClose}>
        <DialogTitle>Buat Produk</DialogTitle>
        <DialogContent dividers>
            <TextField
                id="nama"
                label="Nama Produk"
                value={name}
                onChange={(e) =>{
                    setError('');
                    setName(e.target.value);
                }}
                helperText={error}
                error={error?true:false}
                disabled={isSubmitting}
            />
        </DialogContent>
        <DialogActions>
            <Button disabled={isSubmitting} onClick={handleClose}>Batal</Button>
            <Button disabled={isSubmitting} onClick={handleSimpan} color="primary" on>Simpan</Button>
        </DialogActions>
    </Dialog>
}

AddDialog.propTypes = {
    open:PropTypes.bool.isRequired,
    handleClose:PropTypes.bool.isRequired
}
export default withRouter(AddDialog);