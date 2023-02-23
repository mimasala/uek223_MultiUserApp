import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const EventDetailsDialog = () => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
        <Button size="small">Edit if ownEvent</Button>
        <Button size="small">Participate if not admin</Button>
      </CardActions>
    </Card>
  );
};
export default EventDetailsDialog;
