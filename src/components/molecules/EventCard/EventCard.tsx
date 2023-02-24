import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const EventCard = () => {

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
        <Button size="small">Learn More</Button>
        <Button size="small">Delete if admin</Button>
      </CardActions>
    </Card>
  );
};
export default EventCard;