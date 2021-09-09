import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    //console.log(tokens=> this.doLoginUser(user.username,tokens));
    
    
    return this.http.post<any>(`${config.apiUrl}/api/login_check`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
        
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/logout`, {
  
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken(){
    return this.http.post<any>(`${config.apiUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }
  private getRefreshToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }


  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    //console.log(tokens);
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    console.log(tokens);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    
  }
}
