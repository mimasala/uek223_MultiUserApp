import { User } from "./User.model";


export type Event = {
  id: string;
  name: string;
  date: Date;
  place: string;
  participants: User[];
};
