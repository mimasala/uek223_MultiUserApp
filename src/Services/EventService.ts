import api from '../config/Api';
import { Event } from '../types/models/Event.model';

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

  getAllEvents: () => {
    return api.get(`/event`);
  },

  deleteEvent: (id: string) => {
    return api.delete(`/event/${id}`);
  },
};

export default EventService;
