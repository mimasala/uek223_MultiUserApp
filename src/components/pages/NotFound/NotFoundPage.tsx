import { Box, Container } from "@mui/material";
import { useStyles } from "./NotFound.style";

const NotFoundPage = () => {
    const notFoundStyles = useStyles();
    return(
        
        <div className={notFoundStyles.contentBox}></div>
);
};
export default NotFoundPage;
