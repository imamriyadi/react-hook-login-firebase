import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import {Route, Switch} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import Home from "./home";
import Pengaturan from "./pengaturan";
import Product from "./produk";
import Transaksi from "./transaksi";
import useStyles from "./style";
import {useFirebase} from "../../components/FirebaseProvider";
import List from "@material-ui/core/List";
import {ListItemIcon, ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import HomeIcon from '@material-ui/icons/Home';
import CartIcon from "@material-ui/icons/ShoppingCart";
import ShopingIcon from "@material-ui/icons/Shop";
import SettingIcon from "@material-ui/icons/Settings";

export default function Private() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {auth} = useFirebase();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSigout = (e) => {
        if (window.confirm("Apa Anda Yakin Ingin Keluar ?"))
            auth.signOut();
    }
    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>

                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Switch>
                            <Route path="/produk" children="Produk"/>
                            <Route path="/transaksi" children="Transaksi"/>
                            <Route path="/pengaturan" children="Pengaturan"/>
                            <Route children="Home"/>
                        </Switch>
                    </Typography>
                    <IconButton onClick={handleSigout} color="inherit">
                        <SignOutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon} >
                    <Typography align="center" variant="h5" component="h5">Toko Online</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Route path="/" exact children={({match, history}) => {
                        return <ListItem
                            button
                            selected={match ? true : false}
                            onClick={() => {
                                history.push('/')
                            }}>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                    }}

                    />

                    <Route path="/produk"
                           children={({match, history}) => {
                               return <ListItem
                                   button
                                   selected={match ? true : false}
                                   onClick={() => {
                                       history.push('/produk')
                                   }}>
                                   <ListItemIcon>
                                       <CartIcon/>
                                   </ListItemIcon>
                                   <ListItemText primary="Produk"/>
                               </ListItem>
                           }}
                    />

                    <Route path="/transaksi"
                           children={({match, history}) => {
                               return <ListItem
                                   button
                                   selected={match ? true : false}
                                   onClick={() => {
                                       history.push('/transaksi')
                                   }}>
                                   <ListItemIcon>
                                       <ShopingIcon/>
                                   </ListItemIcon>
                                   <ListItemText primary="Transaksi"/>
                               </ListItem>
                           }}
                    />
                    <Route path="/pengaturan"
                           children={({match, history}) => {
                               return <ListItem
                                   button
                                   selected={match ? true : false}
                                   onClick={() => {
                                       history.push('/pengaturan/pengguna')
                                   }}>
                                   <ListItemIcon>
                                       <SettingIcon/>
                                   </ListItemIcon>
                                   <ListItemText primary="Pengaturan"/>
                               </ListItem>
                           }}
                    />
                </List>


            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route path="/pengaturan" component={Pengaturan}/>
                        <Route path="/produk" component={Product}/>
                        <Route path="/transaksi" component={Transaksi}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Container>
            </main>
        </div>
    );
}

