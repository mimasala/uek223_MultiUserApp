import { Moment } from "moment";
import { User } from "./User.model";

export type EventModel = {
  id: string;
  eventName: string;
  participantsLimit: number;
  startDate: Moment;
  endDate: Moment;
  location: string;
  description: string;
  eventOwner?: User ;
  imageUrl: string;
};
