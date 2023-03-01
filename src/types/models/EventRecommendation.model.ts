import { User } from "./User.model";


export type EventRecommendation = {
  eventId: string;
  currentUserEnrolled: boolean;
  eventName: string;
  imageUrl: string;
};
