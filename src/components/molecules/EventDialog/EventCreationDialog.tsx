import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EventCreationDialog = () => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="organize events"
        height="140"
        image="/images/OrganizeEvent.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Edit your event
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
  );
};
export default EventCreationDialog;