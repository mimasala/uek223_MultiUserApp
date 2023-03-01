import { User } from "./User.model";


export type Event = {
  id: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
  place: string;
  participants: User[];
  participantsLimit:number;
  description:string;
  eventOwner:User
};
