import { Devis } from "./devis";
import { Facture } from "./facture";
import { Formateur } from "./formateur";
import { Formation } from "./formation";
import { Participant } from "./participant";

export  class  Reservation {
    id: number;
    dateFin: Date;
    dateDeb: Date;
    devis:Devis;
    facture:Facture;
    formation: Formation;
    Formateur:Formateur;
    participant:Participant;

}
