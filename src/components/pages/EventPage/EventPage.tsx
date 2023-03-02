import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";
import EventCard from "../../molecules/EventCard/EventCard";

const EventPage = () => {
    const [page, setPage] = useState(2);
    const [count, setCount] = useState(0);
    const context = useContext(ActiveUserContext);
    const [events, setEvents] = useState<EventRecommendation[]>([]);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        EventService.getRecommendationsForUser(context.user!.id, value-1, 2).then((res) => {
            setEvents(res);
          });
        setPage(value)

      };

    useEffect(() => {
        return () => {
          EventService.getNumberOfEventPages(2).then((res) => {
            console.log(res)
            setCount(res);
          })
          EventService.getRecommendationsForUser(context.user!.id, 0, 2).then((res) => {
            setEvents(res);
          });
        };
    }, []);

    return(
        <Container fixed >
        <Box sx={{  height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1 >Available Events</h1>
            <Container maxWidth="md" >
              <Grid container spacing={10} sx={{ marginTop:"10%", marginBottom: "20%"}}>
                {events.map((event: EventRecommendation) => {
                    return(
                      <Grid item xs={6}>
                      <EventCard {...event}/>
                      </Grid>
                    ); 
                  })}
                  <Grid item xs={12} >
                    {events.at(0) && (<Stack spacing={2} sx={{alignItems:"center"}}>
                      <Pagination count={count} page={page} onChange={handleChange} />
                    </Stack>)}
                  </Grid>
                </Grid>
            </Container>
        </Box>
      </Container>
      
);
};
export default EventPage;
