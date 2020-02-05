import React from "react";
import Button from "@material-ui/core/Button";
import {useFirebase} from "../../../components/FirebaseProvider";


function Home() {
    const {auth} = useFirebase();
    return <>
        <h1>Halaman Home</h1>
        <Button onClick={(e)=>{
            auth.signOut();
        }
        }>SingOut</Button>
    </>
}

export default Home;