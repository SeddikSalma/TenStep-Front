import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation  } from  'src/app/models/reservation';
import { Observable } from  'rxjs';
import { config } from './../config';
import { Devis } from '../models/devis';
import { Formation } from '../models/formation';
import { Participant } from '../models/participant';
import { Facture } from '../models/facture';
import { Formateur } from '../models/formateur';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  readReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${config.apiUrl}/reservation`);
  }
  readFormateurs(): Observable<Formateur[]>{
    return this.http.get<Formateur[]>(`${config.apiUrl}/formateur`);
  }
  addReservation(form:Reservation): Observable<Reservation>{
    return this.http.post<Reservation>(`${config.apiUrl}/reservations`,form);
  }
  updateReservation(id:number,form:Reservation): Observable<Reservation>{
    return this.http.put<Reservation>(`${config.apiUrl}/reservation/${id}`,form);
  }
  deleteReservation(id:number): Observable<Reservation>{
    return this.http.delete<Reservation>(`${config.apiUrl}/reservation/${id}`);
  }
  updateFormateur(id:number,form:Reservation): Observable<Reservation>{
    return this.http.put<Reservation>(`${config.apiUrl}/reservation/Formateur/${id}`,form);
  }
  getdevis(id:number): Observable<Devis>{
    return this.http.get<Devis>(`${config.apiUrl}/Devis/${id}`);
  }
  getform(id:number): Observable<Formation>{
    return this.http.get<Formation>(`${config.apiUrl}/formation/${id}`);
  }
  getpart(id:number): Observable<Participant>{
    return this.http.get<Participant>(`${config.apiUrl}/participant/${id}`);
  }
  readFormations(): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${config.apiUrl}/formation`);
  }
  readParticipants(): Observable<Participant[]>{
    return this.http.get<Participant[]>(`${config.apiUrl}/participant`);
  }
  addReservationDevis(id:number,form:Devis): Observable<Devis>{
    return this.http.post<Devis>(`${config.apiUrl}/Devis/${id}`,form);
  }
  addReservationFac(id:number,form:Facture): Observable<Facture>{
    return this.http.post<Facture>(`${config.apiUrl}/Facture/${id}`,form);
  }
  getres(id:number): Observable<Reservation>{
    return this.http.get<Reservation>(`${config.apiUrl}/reservation/${id}`);
  }
  getformateur(id:number): Observable<Formateur>{
    return this.http.get<Formateur>(`${config.apiUrl}/formateur/${id}`);
  }
}
