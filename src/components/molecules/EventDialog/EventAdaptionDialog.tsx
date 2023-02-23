import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const EventAdaptionDialog = () => {

  return (
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
  );
};
export default EventAdaptionDialog;