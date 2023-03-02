import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    contentDiv: {
      marginLeft: "20px",
      marginRight: "20px"
    },
    fab:{
      position: "fixed", bottom: "75px", right: "10px"
    }
  })
);
