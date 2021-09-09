import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation  } from  'src/app/models/formation';
import { Observable } from  'rxjs';
import { config } from './../config';

@Injectable({
  providedIn: 'root'
})
export class FormationServiceService {

  constructor(private http: HttpClient) { }

  readFormations(): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${config.apiUrl}/formation`);
  }

 updateFormation(id:number,form:Formation): Observable<Formation>{
    return this.http.put<Formation>(`${config.apiUrl}/formation/${id}`,form);
  }
  deleteFormation(id:number): Observable<Formation>{
    return this.http.delete<Formation>(`${config.apiUrl}/formation/${id}`);
  }
  addFormation(form:Formation): Observable<Formation>{
    return this.http.post<Formation>(`${config.apiUrl}/formations`,form);
  }
}
