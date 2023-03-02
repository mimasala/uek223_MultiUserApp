import api from '../config/Api';
import { EventModel } from '../types/models/Event.model';

const EventService = {

  getEvent: async (eventID: string): Promise<EventModel> => {
    const { data } = await api.get<EventModel>(`/event/${eventID}`);
    return data;
  },

  updateEvent: (event: EventModel) => {
    return api.put(`/event/${event.id}`, event);
  },

  addEvent: (event: EventModel) => {
    return api.post('/event', event).then((res) => {
      return res.data;
    });
  },

  getRecommendationsForUser:(userId: string, page: number, pageLength: number ) => {
    return api.get(`/recommendation/${userId}`, { params: { page, pageLength}}).then((res) => {
      return res.data;
    });
  },

  getAllEvents: () => {
    return api.get(`/event`);
  },

  deleteEvent: (id: string) => {
    return api.delete(`/event/${id}`);
  },

  getOwnEvents: async (user_id: string): Promise<EventModel[]> => {
    return api.get(`/event`, {params: {user_id} }).then((res) => {
      return res.data;
    });
  },

  getNumberOfEventPages: async (pageLength: number): Promise<number> => {
    const { data } = await api.get<number>(`/event/pageCount/${pageLength}`);
    return data;
  }
};

export default EventService;
