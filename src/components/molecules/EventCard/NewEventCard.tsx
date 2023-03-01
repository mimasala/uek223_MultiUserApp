import { Button, Card, CardActions, CardContent, CardMedia, Dialog, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NewEventCard = () => {
// get user or pass 
//formik validation 
// enable participant adding with list of users 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    <div>
      <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
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
        <TextField label="Eventname"></TextField>
        <Button variant="contained" component="label">
            Upload Eventimage
            <input type="file" hidden/>
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Startdate"
                      inputFormat="YYYY-MM-DD"
                      disablePast={true}
                      maxDate={moment().add(18, "months")}
                      minDate={moment()}
                      renderInput={(params) => <TextField {...params} />} onChange={function (value: moment.Moment | null, keyboardInputValue?: string | undefined): void {
                          throw new Error("Function not implemented.");
                      } } value={undefined}                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Enddate"
                      inputFormat="YYYY-MM-DD"
                      disablePast={true}
                      maxDate={moment().add(18, "months")}
                      renderInput={(params) => <TextField {...params} />} onChange={function (value: moment.Moment | null, keyboardInputValue?: string | undefined): void {
                          throw new Error("Function not implemented.");
                      } } value={undefined}                  />
                </LocalizationProvider>
        <TextField label="Location"></TextField>
      </CardContent>
      <CardActions>
        <Button size="small">Save event</Button>
      </CardActions>
    </Card>
      </Dialog>
    </div>
    </>
  );
};
export default NewEventCard;
