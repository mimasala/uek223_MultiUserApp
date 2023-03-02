import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";
import EventCard from "../../organisms/EventCard/EventCard";
import { useStyles } from "./Event.style";

const EventPage = () => {
    const [page, setPage] = useState(2);
    const [count, setCount] = useState(0);
    const context = useContext(ActiveUserContext);
    const [events, setEvents] = useState<EventRecommendation[]>([]);
    const eventStyles = useStyles();

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        EventService.getRecommendationsForUser(context.user!.id, value-1, 4).then((res) => {
            setEvents(res);
          });
        setPage(value)

      };

    useEffect(() => {
        return () => {
          EventService.getNumberOfEventPages(4).then((res) => {
            setCount(res);
          })
          EventService.getRecommendationsForUser(context.user!.id, 0, 4).then((res) => {
            setEvents(res);
          });
        };
    }, []);

    return(
        <Container fixed >
        <Box className={eventStyles.contentBox} >
            <h1 >Available Events</h1>
            <Container maxWidth="md" className={eventStyles.container}>
              <Grid container spacing={10} className={eventStyles.gridContainer}>
                {events.map((event: EventRecommendation, key) => {
                    return(
                      <Grid item xs={6}>
                        <EventCard {...event} key={key}/>
                      </Grid>
                    ); 
                  })}
                </Grid>
            </Container>
            <Stack spacing={2} className={eventStyles.stack}>
                  <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
        </Box>
      </Container>
      
);
};
export default EventPage;
