import { Button, Card, CardActions, CardContent, CardMedia, Dialog, TextField, Typography } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { EventModel } from "../../../types/models/Event.model";
import { useFormik } from "formik";
import EventService from "../../../Services/EventService";
import DeleteIcon from '@mui/icons-material/Delete';

const EditEventCard = (event: EventModel) => {
  const [openEditEventDialog, setOpenEditEventDialog] = useState(false);
  //delete button

  const submitActionHandler = (values: EventModel) => {
    EventService.updateEvent(values);
    setOpenEditEventDialog(false);
  };

  const handleDelete = () => {
    EventService.deleteEvent(event.id);
    setOpenEditEventDialog(false);
  }

  useEffect(() => {
    console.log(event, event.id)
  }, [])
  

  const formik = useFormik<EventModel>({
    initialValues: {
      id: event ? event.id : "123",
      eventName: event ? event.eventName : "",
      numberOfCurrentParticipants: event ? event.numberOfCurrentParticipants : 0,
      participantsLimit: event ? event.participantsLimit : 0,
      startDate: event ? event.startDate : moment(),
      endDate: event ? event.endDate : moment(),
      location: event ? event.location : "",
      description: event ? event.description : "",
      eventOwner: event ? event.eventOwner : undefined,
      imageUrl: event ? event.imageUrl : "/images/OrganizeEvent.png",
    },
    //validation
    onSubmit: (values: EventModel) => {
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  // get all participants
  // enable adding participants

  const handleClickOpenEditEvent = () => {
    setOpenEditEventDialog(true);
  };
  const handleCloseEditEvent = () => {
    setOpenEditEventDialog(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
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

      <Dialog
        open={openEditEventDialog}
        keepMounted
        onClose={handleCloseEditEvent}
        aria-describedby="alert-dialog-slide-description">
        <form onSubmit={formik.handleSubmit}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="organize events"
              height="140"
              image={formik.values.imageUrl}
            />
          
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Edit your event
              </Typography>
              <Button variant="contained" component="label">
                Upload Eventimage
                <input type="file" hidden/>
              </Button>

              <TextField name="eventName" label="Event name" type="text" value={formik.values.eventName} onChange={formik.handleChange}></TextField>
              <TextField name="location" label="Location" type="text" value={formik.values.location} onChange={formik.handleChange}></TextField>
              <TextField name="description" label="Description" type="text" value={formik.values.description} onChange={formik.handleChange}></TextField>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                            label="Startdate"
                            inputFormat="YYYY-MM-DD"
                            disablePast={true}
                            value={formik.values.startDate}
                            maxDate={moment().add(18, "months")}
                            minDate={moment()}         
                            onChange={(value) => {
                              formik.setFieldValue(
                                "startDate",
                                value && moment(value).isValid()
                                  ? value.add(value.utcOffset(), "minutes")
                                  : moment(null),
                                true
                              );
                              if (
                                value &&
                                moment(value).isValid() &&
                                (value?.isAfter(formik.values.endDate) ||
                                  !moment(formik.values.endDate.toString()).isValid())
                              ) {
                                formik.setFieldValue(
                                  "endDate",
                                  value.add(value.utcOffset(), "minutes"),
                                  true
                                );
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                required
                                name="startDate"
                                onBlur={formik.handleBlur}
                              />
                      )}/>    
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Enddate"
                            inputFormat="YYYY-MM-DD"
                            disablePast={true}
                            maxDate={moment().add(18, "months")}
                            minDate={formik.values.startDate}
                            value={formik.values.endDate}
                            onChange={(value) => {
                              formik.setFieldValue(
                                "endDate",
                                value && value.add(value.utcOffset(), "minutes"),
                                true
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                required
                                name="endDate"
                                onBlur={formik.handleBlur}
                              />
                            )} />
              </LocalizationProvider>
            </CardContent>
            <CardActions>
              <MuiButton type="submit" variant="contained">Save changes</MuiButton>
              <MuiButton onClick={() => handleDelete()}> <DeleteIcon /></MuiButton>
            </CardActions>
          </Card>
        </form>
      </Dialog>
    </>
  );
};
export default EditEventCard;

