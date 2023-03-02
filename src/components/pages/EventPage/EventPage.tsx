import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { positional } from "yargs";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";
import EventCard from "../../organisms/EventCard/EventCard";

const EventPage = () => {
    const [page, setPage] = useState(2);
    const [count, setCount] = useState(0);
    const context = useContext(ActiveUserContext);
    const [events, setEvents] = useState<EventRecommendation[]>([]);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        EventService.getRecommendationsForUser(context.user!.id, value-1, 4).then((res) => {
            setEvents(res);
          });
        setPage(value)

      };

    useEffect(() => {
        return () => {
          EventService.getNumberOfEventPages(4).then((res) => {
            console.log(res)
            setCount(res);
          })
          EventService.getRecommendationsForUser(context.user!.id, 0, 4).then((res) => {
            setEvents(res);
          });
        };
    }, []);

    return(
        <Container fixed >
        <Box sx={{  height: '68vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1 >Available Events</h1>
            <Container maxWidth="md" sx={{height:'50vh'}}>
              <Grid container spacing={10} sx={{ marginTop:"10%", marginBottom: "20%"}}>
                {events.map((event: EventRecommendation, key) => {
                    return(
                      <Grid item xs={6}>
                        <EventCard {...event} key={key}/>
                      </Grid>
                    ); 
                  })}
                </Grid>
            </Container>
            <Stack spacing={2} sx={{alignItems:"center", marginBottom:"0"}}>
                  <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
        </Box>
      </Container>
      
);
};
export default EventPage;
