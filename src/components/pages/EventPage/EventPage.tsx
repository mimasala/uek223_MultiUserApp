import { Box, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { Event } from "../../../types/models/Event.model";
import EventCard from "../../molecules/EventCard/EventCard";

const EventPage = () => {
    const [page, setPage] = React.useState(1);
    const context = useContext(ActiveUserContext);
    const [events, setEvents] = useState<Event[]>([]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      console.log(value)
        EventService.getRecommendationsForUser(context.user!.id, value-1, 1).then((res) => {
          console.log("dsfg")
            setEvents(res);
          });
        setPage(value)
      };

    useEffect(() => {
      console.log("dsf")
        return () => {
            EventService.getRecommendationsForUser(context.user!.id, 0, 1).then((res) => {
              setEvents(res);
              console.log(res);
            });
        };
    }, []);

    return(
        <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1 >Available Events</h1>
            <Container maxWidth="md" >
              <Grid container spacing={10} sx={{ bgcolor: '#cfe8fc', marginTop:"10%", marginBottom: "20%"}}>
              {events.map((event: Event) => {
                    return(                   
                      <Grid item xs={6}>
                      <EventCard {...event}/>
                      </Grid>
                    ); 
                    })}
                      <Grid item xs={12} >
                      <Stack spacing={2} sx={{alignItems:"center"}}>
                        <Pagination count={3} page={page} onChange={handleChange} />
                      </Stack>
                      </Grid>
                </Grid>

            </Container>
        </Box>
      </Container>
      
);
};
export default EventPage;
