import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServicesService } from './services.service';
@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  isDev:Boolean;
  _url:string ='http://localhost:3000';
  tu:Boolean = false;
  constructor(
    private http:HttpClient,
    private _router:Router,
    private _service:ServicesService
  ) {
    this.isDev = true;  // Change to false before deployment
  }
  bayDone(data, id) {
    return this.http.post<any>( `${this._url}/users/user/${id}`, data).pipe(
      catchError(this._service.handleError)
    )
  }
  
  registerUser(user) {
    return this.http.post<any>( `${this._url}/users/register`, user).pipe(
      catchError(this._service.handleError)
    )
  }
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loginUser(user) {
    {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authToken);
      return this.http.post(`${this._url}/users/login`, user).pipe(
        catchError(this._service.handleError)
      );
    }
  }
    
  getToken() {
    return localStorage.getItem('token')
  }
  loggedIn() {
    return tokenNotExpired('token');
  }
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.get(`${this._url}/users/profile`, httpOptions).pipe(
      catchError(this._service.handleError)
    );
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
