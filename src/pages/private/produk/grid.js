import React, {useEffect, useState} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles/grid";
import AddDialog from './add';
import {useFirebase} from "../../../components/FirebaseProvider";
import {useCollection} from "react-firebase-hooks/firestore";
import AppLoading from "../../../components/AppPageLoading";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Card, CardActions, CardContent} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import {Delete, Edit, Image} from "@material-ui/icons";
import {currency} from "../../../utils/formater";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";

function ProdukGrid() {
    const classes = useStyles();
    const {firestore, user, storage} = useFirebase();
    const produkCol = firestore.collection(`toko/${user.uid}/produk`);
    const [snapshot, loading] = useCollection(produkCol);
    const [produkItem, setProdukItem] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        if (snapshot) {
            setProdukItem(snapshot.docs);
        }
    }, [snapshot]);
    if (loading) {
        return <AppLoading/>
    }

    const handleDelete = produkDoc => async e => {
        if (window.confirm("Anda Yakin Ingin Menghapus Produk ?")) {
            await produkDoc.ref.delete();
            const fotoUrl = produkDoc.data().foto;
            if (fotoUrl) {
                storage.refFromURL(fotoUrl).delete();
            }
        }
    }

    return <>
        <Typography variant="h5" component="h1" paragraph>Daftar Produk</Typography>
        {
            produkItem.length <= 0 && <Typography>Belum Ada Produk</Typography>
        }
        <Grid container spacing={5}>
            {
                produkItem.map((produkDoc) => {
                    const produkData = produkDoc.data();
                    return <Grid key={produkDoc.id} item={true} xs={12}
                                 sm={12} md={6} lg={4}
                    >
                        <Card className={classes.card}>
                            {
                                produkData.foto &&
                                <CardMedia
                                    className={classes.foto}
                                    image={produkData.foto}
                                    title={produkData.name}
                                />
                            }

                            {
                                !produkData.foto &&
                                <div className={classes.fotoPlaceholder}>
                                    <Image
                                        size="large"
                                        color="disabled"
                                    />
                                </div>
                            }
                            <CardContent className={classes.produkDetails}>
                                <Typography variant="h5" noWrap>
                                    {produkData.name}
                                </Typography>
                                <Typography variant="subtitle1">Harga : {currency(produkData.harga)}</Typography>
                                <Typography>Stok : {produkData.stok}</Typography>
                            </CardContent>
                            <CardActions className={classes.produkAction}>
                                <IconButton component={Link} to={`/produk/edit/${produkDoc.id}`}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={handleDelete(produkDoc)}>
                                    <Delete/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                })
            }
        </Grid>
        <Fab className={classes.fab} color="primary"
             onClick={(e) => {
                 setOpenDialog(true);
             }}
        >
            <AddIcon/>
        </Fab>
        <AddDialog open={openDialog} handleClose={() => {
            setOpenDialog(false);
        }}/>
    </>
}

export default ProdukGrid;