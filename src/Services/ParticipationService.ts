import api from '../config/Api';
import { EventModel } from '../types/models/Event.model';
import { User } from '../types/models/User.model';

const ParticipationService = {

  participateAtEvent: async (eventID: string, userID: string): Promise<string> => {
    const { data } = await api.get<string>(`/event/`, { params: { eventID, userID } });
    return data;
  },
  signManyUserUpForEvent: async ( eventID: string, userIDs: string[]): Promise<EventModel> => {
    const { data } = await api.get<EventModel>(`/eventUser/${eventID}`, { params: { userIDs } });
    return data;
  },
  getAllParticipantsInEvent: async ( eventID: string, page: number, pageLength: number): Promise<User[]> => {
    const { data } = await api.get<User[]>(`/eventUser/event/${eventID}`, { params: { page, pageLength } });
    return data;
  },


};

export default ParticipationService;
