import { Button, Card, CardActions, CardContent, CardMedia,  Typography } from "@mui/material";

import { useState } from "react";
import { EventModel } from "../../../types/models/Event.model";
import EventDataFunctionalityDialog from "../../atoms/EventDataFunctionalityDialog";

const EditEventCard = (event: EventModel) => {
  const [openEditEventDialog, setOpenEditEventDialog] = useState(false);

  const handleClickOpenEditEvent = () => {
    setOpenEditEventDialog(true);
  };
  return (
    <>
      <Card sx={{ maxWidth:400 }}>
        <CardMedia
          component="img"
          alt="Event image"
          height="140"
          image={event.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.eventName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickOpenEditEvent}>Edit event</Button>
        </CardActions>
      </Card>
      <EventDataFunctionalityDialog isNewEvent={false} open={openEditEventDialog} setOpen={setOpenEditEventDialog} event={event}/>
    </>
  );
};
export default EditEventCard;

