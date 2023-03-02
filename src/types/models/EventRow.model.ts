import { User } from "./User.model"

export type EventRow = {
    eventName:string
    currentParticipants:number
    participantsLimit:number
    startDate:string
    endDate:string
    location:string
    description:string
    owner:string
}