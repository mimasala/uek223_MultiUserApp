import { Box, Button, Container, Grid } from "@mui/material";
import EventCard from "../../molecules/EventCard/EventCard";
import NewEventCard from "../../molecules/EventCard/NewEventCard";
import { useStyles } from "./OwnEvent.style";

const OwnEventsPage = () => {
    const eventStyles = useStyles();
    return(
        <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', textAlign: 'center',  overflow: 'auto'}} >
            <h1>Created Events</h1>
            <Button variant="outlined">New</Button>
            <Container maxWidth="md" >
            <Grid container spacing={10} sx={{ bgcolor: '#cfe8fc', marginTop:"5%", marginBottom: "10%"}}>
                    <Grid item xs={6}>
                    <EventCard />
                    </Grid>
                    <Grid item xs={6}>
                    <EventCard/>
                    </Grid>
                    <Grid item xs={6}>
                    <EventCard />
                    </Grid>
                    <Grid item xs={6}>
                    <EventCard/>
                    </Grid>
                    <Grid item xs={6}>
                    <EventCard />
                    </Grid>
                    <Grid item xs={6}>
                    <NewEventCard/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
      </Container>
);
};
export default OwnEventsPage;
