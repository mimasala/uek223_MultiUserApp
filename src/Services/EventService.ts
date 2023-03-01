import api from '../config/Api';
import { EventModel } from '../types/models/Event.model';

const EventService = {

  getEvent: async (eventID: string): Promise<EventModel> => {
    const { data } = await api.get<EventModel>(`/event/${eventID}`);
    return data;
  },

  updateEvent: (event: EventModel) => {
    console.log(event);
    return api.put(`/event/${event.id}`, event);
  },

  addEvent: (event: EventModel) => {
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
  getOwnEvents: async (userId: string): Promise<EventModel[]> => {
    return api.get(`/event`, {params: userId }).then((res) => {
      return res.data;
    });
  },
};

export default EventService;
