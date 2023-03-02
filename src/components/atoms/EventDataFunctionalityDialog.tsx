import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, Pagination, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import moment from "moment";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { object, string } from "yup";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import EventService from "../../Services/EventService";
import ParticipationService from "../../Services/ParticipationService";
import { EventModel } from "../../types/models/Event.model";
import { User } from "../../types/models/User.model";
import AddParticipantsDialog from "./AddParticipantsDialog";
import DeleteIcon from '@mui/icons-material/Delete';

interface EventDialogProps {
    isNewEvent: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    event?: EventModel;
  }
const EventDataFunctionalityDialog = ({ isNewEvent, open, setOpen, event }: EventDialogProps) => {
    const context =  useContext(ActiveUserContext);
    const [openAddPeople, setOpenAddPeople] = useState<boolean>(false); 
    const [createdEventId, setCreatedEventId] = useState<string>(''); 
    const [page, setPage] = useState(1);
    const [participants, setParticipants] = useState<User[]>([]);

      const handleCloseDialog = () => {
        setOpen(false);
      };

      const submitActionHandler = (values: EventModel) => {
        if(isNewEvent){
            if(context.user){
                values.eventOwner = context.user;
              }
            EventService.addEvent(values).then(response => {
                setCreatedEventId(response.id);
            });
            setOpen(false);
            setOpenAddPeople(true);
        } else {
            EventService.updateEvent(values);
            setOpen(false);
        }

      };
    
      const handleDelete = () => {
        if(event?.id){
          EventService.deleteEvent(event.id);
        }
        setOpen(false);
      }  
    
      const handlePagination = (changeEvent: ChangeEvent<unknown>, value: number) => {
        if(event?.id){
            ParticipationService.getAllParticipantsInEvent(event.id, value-1, 3).then((res) => {
                setParticipants(res);
              });
            setPage(value)
        }
      };
      
      useEffect(() => { 
        return () => {
        if(event?.id){
          ParticipationService.getAllParticipantsInEvent(event.id, 0, 3).then((res) => {
            console.log("part", res)
            setParticipants(res);
          });
        }
        }
      }, [])

      const eventValidationSchema = object().shape({
        eventName: string()
          .required("Name is required")
          .min(3, "Name should be at least 3 characters long")
          .max(50, "Name can max be 30 characters long"),   
          location: string()
          .required("Location is required")
          .min(3, "Location should be at least 3 characters long")
          .max(30, "Location can max be 30 characters long"),   
          description: string()
          .required("Description is required")
          .min(3, "Description should be at least 3 characters long")
          .max(200, "Description can max be 200 characters long"),   
          imageUrl: string().url("Needs to be a url"),
      });
      
    
      const formik = useFormik<EventModel>({
        initialValues: {
          id: event ? event.id : "",
          eventName: event ? event.eventName : "",
          participantsLimit: event ? event.participantsLimit : 0,
          startDate: event ? event.startDate : moment(),
          endDate: event ? event.endDate : moment(),
          location: event ? event.location : "",
          description: event ? event.description : "",
          eventOwner: event ? event.eventOwner : undefined,
          imageUrl: event ? event.imageUrl : "/images/OrganizeEvent.png",
        },
        validationSchema: eventValidationSchema,
        onSubmit: (values: EventModel) => {
          submitActionHandler(values);
        },
        validateOnChange: true,
        validateOnBlur: true,
      });
  
  return (
    <>
    <Dialog
      open={open}
      keepMounted
      onClose={handleCloseDialog}
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
            <TextField name="imageUrl" label="Image url" type="text" value={formik.values.imageUrl} onChange={formik.handleChange} error={Boolean(formik.errors.imageUrl && formik.touched.imageUrl)} helperText={formik.touched.imageUrl && formik.errors.imageUrl}></TextField>
            <TextField name="eventName" label="Event name" type="text" value={formik.values.eventName} onChange={formik.handleChange} error={Boolean(formik.errors.eventName && formik.touched.eventName)} helperText={formik.touched.eventName && formik.errors.eventName}></TextField>
            <TextField name="location" label="Location" type="text" value={formik.values.location} onChange={formik.handleChange} error={Boolean(formik.errors.location && formik.touched.location)} helperText={formik.touched.location && formik.errors.location}></TextField>
            <TextField name="description" label="Description" type="text" value={formik.values.description} onChange={formik.handleChange} error={Boolean(formik.errors.description && formik.touched.description)} helperText={formik.touched.description && formik.errors.description}></TextField>

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
              {!isNewEvent && (
                <Box>
                {participants.map((participant: User) => {
                    return(                   
                      <p>{participant.firstName} {participant.lastName}</p>
                    ); 
                  })}
                <Stack spacing={2} sx={{alignItems:"center"}}>
                  <Pagination count={1} page={page} onChange={handlePagination} />
                </Stack>
              </Box>
              )}
            </CardContent>
            <CardActions>
            {!isNewEvent && (
              <>
                <Button type="submit" variant="contained">Save changes</Button>
                <Button onClick={() => handleDelete()}> <DeleteIcon /></Button>
              </>
              )}
              {isNewEvent && (<> <Button type="submit" variant="contained">Save</Button></>)}
            </CardActions>
          </Card>

        </form>
      </Dialog>
        <AddParticipantsDialog openAddPeople={openAddPeople} setOpenAddPeople={setOpenAddPeople} createdEventId={createdEventId}/>                
    </>
  );
};
export default EventDataFunctionalityDialog;
