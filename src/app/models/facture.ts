import { Reservation } from "./reservation";

export  class  Facture{
    id: number;
    somme:number;
    nbrParticipant:number;
    date:Date;
    reservation:Reservation;
}