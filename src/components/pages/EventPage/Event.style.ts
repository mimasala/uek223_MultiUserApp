import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    contentBox: {
      height: '68vh', 
      textAlign: 'center',  
      overflow: 'auto', 
      marginBottom: "20%"
    },
    container:{
      height:'50vh'
    },
    gridContainer: {
      marginTop:"10%", 
      marginBottom: "20%"
    },
    stack: {
      alignItems:"center", 
      marginBottom:"0"
    }
  })
);
