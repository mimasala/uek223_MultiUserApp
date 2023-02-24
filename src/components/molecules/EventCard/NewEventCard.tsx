import { Button, Card, CardContent, CardMedia } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const NewEventCard = () => {

  return (
    <Card sx={{ maxWidth: 345, height: 280}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/images/OrganizeEvent.png"
      />
      <CardContent >
        <Button sx={{color: "black"}}><AddIcon color='inherit' sx={{ fontSize:"10vh"}}/></Button> 
      </CardContent>
    </Card>
  );
};
export default NewEventCard;
