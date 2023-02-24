import { Box, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import EventCard from "../../molecules/EventCard/EventCard";

type Config = {
    page: number, pageLength: number
  }
const EventPage = () => {
    let config: Config;
    const [page, setPage] = React.useState(1);
    const context = useContext(ActiveUserContext);
    const [events, setEvents] = useState();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        EventService.getRecommendationsForUser(context.user!.id, value, 6).then((res) => {
            setEvents(res);
          });
        setPage(value)
      };

    useEffect(() => {
        return () => {
            EventService.getRecommendationsForUser(context.user!.id, 1, 6).then((res) => {
              setEvents(res);
              console.log(res);
            });
            setPage(1);
        };
      });

    return(
        <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', textAlign: 'center',  overflow: 'auto'}} >
            <h1 >Available Events</h1>
            <Container maxWidth="md" >
            <Grid container spacing={10} sx={{ bgcolor: '#cfe8fc', marginTop:"10%", marginBottom: "10%"}}>
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
                    <EventCard/>
                    </Grid>
                </Grid>
                <Stack spacing={2}>
                    <Pagination count={10} page={page} onChange={handleChange} />
                </Stack>
            </Container>
        </Box>
      </Container>
);
};
export default EventPage;
