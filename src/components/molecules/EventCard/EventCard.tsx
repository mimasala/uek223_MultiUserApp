import { Button, Card, CardActions, CardContent, CardMedia, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventService from "../../../Services/EventService";
import { EventModel } from "../../../types/models/Event.model";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";

const EventCard = (props: EventRecommendation) => {
  const [openLearnMoreDialog, setOpenLearnMoreDialog] = useState(false);
  const [event, setEvent] = useState<EventModel>();

  const handleClickOpenLearnMore = () => {
    setOpenLearnMoreDialog(true);
  };

  const handleCloseLearnMore = () => {
    setOpenLearnMoreDialog(false);
  };

  useEffect(() => {
    return () => {
      EventService.getEvent(props.eventId).then((res) => {
        setEvent(res);
      })
    }
  }, [props.eventId])
  
  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Event image"
        height="140"
        image={props.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.eventName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpenLearnMore}>Learn more</Button>
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
          alt="Event image"
          height="140"
          image={props.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event?.eventName}
          </Typography>
          <br/>
          <Typography variant="body2" color="text.secondary">
            What: {event?.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Where: {event?.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            When : {event?.startDate.toString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Until: {event?.endDate.toString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Participate</Button>
        </CardActions>
      </Card>
      </Dialog>
    </div>
</>
  );
};
export default EventCard;
