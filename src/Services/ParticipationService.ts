import api from '../config/Api';
import { EventModel } from '../types/models/Event.model';

const ParticipationService = {

  participateAtEvent: async (eventID: string, userID: string): Promise<string> => {
    const { data } = await api.get<string>(`/event/`, { params: { eventID, userID } });
    return data;
  },


};

export default ParticipationService;
