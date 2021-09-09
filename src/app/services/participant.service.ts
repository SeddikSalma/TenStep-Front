import { Injectable } from '@angular/core';
import { Participant  } from  'src/app/models/participant';
import { Observable } from  'rxjs';
import { config } from './../config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  readParticipants(): Observable<Participant[]>{
    return this.http.get<Participant[]>(`${config.apiUrl}/participant`);
  }
  addParticipant(form:Participant): Observable<Participant>{
    return this.http.post<Participant>(`${config.apiUrl}/participant`,form);
  }
  updateParticipant(id:number,form:Participant): Observable<Participant>{
    return this.http.put<Participant>(`${config.apiUrl}/participant/${id}`,form);
  }
  deleteParticipant(id:number): Observable<Participant>{
    return this.http.delete<Participant>(`${config.apiUrl}/participant/${id}`);
  }
}
