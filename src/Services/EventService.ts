import api from '../config/Api';
import { Event } from '../types/models/Event.model';


type Config = {
  page: number, pageLength: number
}

const EventService = {

  getEvent: async (eventID: string): Promise<Event> => {
    const { data } = await api.get<Event>(`/event/${eventID}`);
    return data;
  },

  updateEvent: (event: Event) => {
    return api.put(`/event/${event.id}`, event);
  },

  addEvent: (event: Event) => {
    return api.post('/event/createEvent', event).then((res) => {
      return res.data;
    });
  },
  getRecommendationsForUser:(userId: String, page: number, pageLength: number )=>{
    return api.get(`/recommendation/${userId}`, { params: { page, pageLength } }).then((res) => {
      return res.data;
    });
  },

  getAllEvents: () => {
    return api.get(`/event`);
  },

  deleteEvent: (id: string) => {
    return api.delete(`/event/${id}`);
  },
};

export default EventService;
