import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formateur  } from  'src/app/models/formateur';
import { Observable } from  'rxjs';
import { config } from './../config';
@Injectable({
  providedIn: 'root'
})
export class FormateurServiceService {

  constructor(private http: HttpClient) { }

  readFormateurs(): Observable<Formateur[]>{
    return this.http.get<Formateur[]>(`${config.apiUrl}/formateur`);
  }
  addFormateur(form:Formateur): Observable<Formateur>{
    return this.http.post<Formateur>(`${config.apiUrl}/formateur`,form);
  }
  updateFormateur(id:number,form:Formateur): Observable<Formateur>{
    return this.http.put<Formateur>(`${config.apiUrl}/formateur/${id}`,form);
  }
  deleteFormateur(id:number): Observable<Formateur>{
    return this.http.delete<Formateur>(`${config.apiUrl}/formateur/${id}`);
  }
}
