import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme =>({
        pengaturanToko:{
            diplay:"flex",
            flexDirection:"column",
            width:300
        },
    actionButton:{
            marginTop:theme.spacing(2)
    }
}));

export default useStyle;