import { Button, Card, CardActions, CardContent, CardMedia, Dialog, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import roles from "../../../config/Roles";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { EventModel } from "../../../types/models/Event.model";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";

const EventCard = (props: EventRecommendation) => {
  const [openLearnMoreDialog, setOpenLearnMoreDialog] = useState(false);
  const [event, setEvent] = useState<EventModel>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const context = useContext(ActiveUserContext)
  if (context.user){
    setIsAdmin(context.user!.roles.some(role => role.name === roles.ADMIN))
  }
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
        {!isAdmin&&<CardActions>
          <Button id="participateButton" size="small">Participate</Button>
        </CardActions>}
      </Card>
      </Dialog>
    </div>
</>
  );
};
export default EventCard;
