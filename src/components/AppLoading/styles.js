import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme=>({
    title:{
        color:theme.palette.main,
        textAlign:"center"
    },
    loadingBox:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        height:"100vh"
    }
}))

export default useStyles;