import { User } from "./User.model";


export type Event = {
  eventId: string;
  currentUserEnrolled: boolean;
  eventName: string;
  imageUrl: string;
};
