import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, FormControlLabel, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
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

const NewEventCard = () => {
  // formik validation 

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
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
    EventService.addEvent(values);
    setOpen(false);
  };

  const handleSaveParticipants = () => {
    console.log("works");
  }

  const handleToggle = (value: User) => () => {
    const currentIndex = users.indexOf(value);
    const newChecked = [...users];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setUsers(newChecked);
  };


  useEffect(() => { 
    return () => {
      UserService.getAllUsers().then((data) => {
        setUsers(data);
      });
    }
  }, [])
  
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
    //validation
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

              <TextField name="imageUrl" label="Image url" type="text" value={formik.values.imageUrl} onChange={formik.handleChange}></TextField>
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
              <Box>
                Choose participants
                <List>
                  {users.map((user) => {
                    return (
                      <ListItem dense onClick={handleToggle(user)}>
                        <FormControlLabel
                          control={<Checkbox checked={users.indexOf(user) !== -1} value={user}/>}
                          label={user.firstName + " " + user.lastName}
                        />
                      </ListItem>
                    );
                  })}
                </List>
                <MuiButton onClick={handleSaveParticipants}>Save participants</MuiButton>
              </Box>
            </CardContent>
            <CardActions>
              <MuiButton type="submit" variant="contained">Save</MuiButton>
            </CardActions>
          </Card>
        </form>
      </Dialog>
    </>
  );
};
export default NewEventCard;
