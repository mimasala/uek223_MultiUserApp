import { Button, Card, CardContent, CardMedia } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import EventDataFunctionalityDialog from "../../atoms/EventDataFunctionalityDialog";

const NewEventCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 280}}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/images/OrganizeEvent.png"
        />
        <CardContent >
          <Button sx={{color: "black"}} onClick={handleClickOpen}><AddIcon color='inherit' sx={{ fontSize:"10vh"}}/></Button> 
        </CardContent>
      </Card>
      <EventDataFunctionalityDialog isNewEvent={true} open={open} setOpen={setOpen}/>
    </>
  );
};
export default NewEventCard;
