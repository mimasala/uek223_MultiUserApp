import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    footerContainer :{
        backgroundColor: "#292928",
        color: "#fff",
        padding: 5,
        position: "fixed",
        bottom: 0,
        width: "100%",
      },
      
      footerContent :{
        display: "flex",
        flexDirection: "row",
        justifyContent: "spaceBetween",
        alignItems: "center",
      }
  })
);
