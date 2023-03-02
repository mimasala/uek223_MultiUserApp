import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, DialogTitle, FormControlLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography, useRadioGroup } from "@mui/material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, FormControlLabel, List, ListItem, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import MuiButton from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EventModel } from "../../../types/models/Event.model";
import { useFormik } from "formik";
import EventService from "../../../Services/EventService";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import UserService from "../../../Services/UserService";
import { User } from "../../../types/models/User.model";
import { blue } from "@mui/material/colors";
import ParticipationService from "../../../Services/ParticipationService";
import { object, string } from "yup";

const NewEventCard = () => {
  // formik validation 
  const [openAddPeople, setOpenAddPeople] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [createdEventId, setCreatedEventId] = useState<string>('');

  const context = useContext(ActiveUserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitActionHandler = (values: EventModel) => {
    if(context.user){
      values.eventOwner = context.user;
    }
    EventService.addEvent(values).then(response => {
      setCreatedEventId(response.id);
    });
    setOpen(false);
    setOpenAddPeople(true);
  };
  
  const handleCloseUser = () => {
    setOpenAddPeople(false);
  };

  const handleListItemClick = (value: User) => {
    let copyOfAddedUsers = [...addedUsers];
    const index = copyOfAddedUsers.indexOf(value, 0);
    if (index > -1) {
      copyOfAddedUsers.splice(index, 1);
    } else {
      copyOfAddedUsers.push(value);
    }
    
    setAddedUsers(copyOfAddedUsers);
  };

  const handleSubmitAddUsers = () => {
    ParticipationService.signManyUserUpForEvent(createdEventId, addedUsers.map(user => user.id))
    .then(res => {
      setOpenAddPeople(false);
    })
  }

  useEffect(() => { 
    return () => {
      UserService.getAllUsers().then((data) => {
        setUsers(data.filter(user => {
          console.log(user);
          if(user.roles.filter(role => role.name === "ADMIN").length > 0) {
                return false;
            }
          return true;
        }));
      });
    }
  }, [])
  
  const eventValidationSchema = object().shape({
    eventName: string()
      .required("Name is required")
      .min(3, "eventNameSizeValidation")
      .max(50, "eventNameSizeValidation"),   
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
  
  const formik = useFormik({
    initialValues: {
      id: "",
      eventName: "", 
      participantsLimit: 0,
      startDate: moment(),
      endDate: moment(),
      location: "",
      description: "",
      eventOwner: undefined,
      imageUrl: "",
    },
    validationSchema: eventValidationSchema,
    onSubmit: (values: EventModel) => {
      submitActionHandler(values);
    },
  });

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
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="organize events"
              height="140"
              image="/images/OrganizeEvent.png"
            />       
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create an event
              </Typography>
              <TextField name="imageUrl" 
              label="Image url"
              type="text" 
              value={formik.values.imageUrl} 
              onChange={formik.handleChange} 
              error={Boolean(formik.errors.imageUrl && formik.touched.imageUrl)} 
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}>
              </TextField>
              <TextField name="eventName" 
              label="Event name" 
              type="text" 
              value={formik.values.eventName} 
              onChange={formik.handleChange} 
              error={Boolean(formik.errors.eventName && formik.touched.eventName)} 
              helperText={formik.touched.eventName && formik.errors.eventName }>
              </TextField>
              <TextField name="location" 
              label="Location" 
              type="text" 
              value={formik.values.location} 
              onChange={formik.handleChange} 
              error={Boolean(formik.errors.location && formik.touched.location)} 
              helperText={formik.touched.location && formik.errors.location}>
              </TextField>
              <TextField name="description" 
              label="Description" 
              type="text" 
              value={formik.values.description} 
              onChange={formik.handleChange} 
              error={Boolean(formik.errors.description && formik.touched.description)} 
              helperText={formik.touched.description && formik.errors.description}>

              </TextField>
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
                    (value?.isAfter(formik.values.startDate) ||
                    !moment(formik.values.startDate.toString()).isValid())
                    ) {
                      formik.setFieldValue(
                      "startDate",
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
              <MuiButton type="submit" variant="contained">Save</MuiButton>
            </CardActions>
          </Card>
        </form>
      </Dialog>

    <Dialog onClose={handleCloseUser} open={openAddPeople}>
      <DialogTitle>Add event participants</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem disableGutters sx={{
             backgroundColor: (addedUsers.indexOf(user, 0) === -1 ? "#FFF" : "#DDD")
          }}>
            <ListItemButton onClick={() => handleListItemClick(user)} key={user.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmitAddUsers} variant="contained">Submit</Button>
    </Dialog>
    </>
  );
};
export default NewEventCard;
