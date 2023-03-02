import { Button, Card, CardActions, CardContent, CardMedia, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";

const EventCard = (props: EventRecommendation) => {
  const [openLearnMoreDialog, setOpenLearnMoreDialog] = useState(false);

// check if user is owner and disable participation btn 
  const handleClickOpenLearnMore = () => {
    setOpenLearnMoreDialog(true);
  };

  const handleCloseLearnMore = () => {
    setOpenLearnMoreDialog(false);
  };

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.eventName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button id="learnMoreButton" size="small" onClick={handleClickOpenLearnMore}>Learn more</Button>
      </CardActions>
    </Card>
    <div>
      <Dialog
        open={openLearnMoreDialog}
        keepMounted
        onClose={handleCloseLearnMore}
        aria-describedby="alert-dialog-slide-description"
      >
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/images/OrganizeEvent.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Eventname
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Something
          </Typography>
        </CardContent>
        <CardActions>
          <Button id="participateButton" size="small">Participate</Button>
        </CardActions>
      </Card>
      </Dialog>
    </div>
</>
  );
};
export default EventCard;
