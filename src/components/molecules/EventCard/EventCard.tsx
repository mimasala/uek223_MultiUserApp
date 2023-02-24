import { Button, Card, CardActions, CardContent, CardMedia, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { Event } from "../../../types/models/Event.model";

const EventCard = (props: Event) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Button size="small" onClick={handleClickOpen}>Learn More</Button>
      </CardActions>
    </Card>

    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
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
          <Button size="small">Save changes</Button>
        </CardActions>
      </Card>
      </Dialog>
    </div>
    </>
  );
};
export default EventCard;
