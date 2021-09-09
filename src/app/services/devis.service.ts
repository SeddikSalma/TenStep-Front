import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from  'rxjs';
import { config } from './../config';
import { Devis } from '../models/devis';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http: HttpClient) { }
  getdeviv(id:number): Observable<Devis>{
    return this.http.get<Devis>(`${config.apiUrl}/reservation/Devis/${id}`);
  }
}
