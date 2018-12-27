import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ServicesService } from './services.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _service:ServicesService,
    private _http:HttpClient,
  ) { 
    this.isDev = true;
  }

  authToken:any;
  user:any;
  isDev:Boolean;
  _url = this._service.url;
  tu:Boolean = false;

  loginAdmin(admin) {
    {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authToken);
      return this._http.post(`${this._url}/admin/login`, admin).pipe(
        catchError(this._service.handleError)
      );
    }
  }

  registerAdmin(newAdmin) {
    return this._http.post<any>( `${this._url}/admin/register`, newAdmin).pipe(
      catchError(this._service.handleError)
    )
  }
  getAllUsers() {
    return this._http.get( `${this._url}/admin/users`).pipe(
      catchError(this._service.handleError)
    )
  }

  editUser(userData:any, id:any) {
    return this._http.post<any>( `${this._url}/admin/${id}/edit`, userData).pipe(
      catchError(this._service.handleError)
    )
  }
  removeUser(id) {
    return this._http.get<any>( `${this._url}/admin/${id}/remove`).pipe(
      catchError(this._service.handleError)
    )
  }
  blockUser(id){
    return this._http.get(`/admin/${id}/block`)
  }
  unblockUser(id){
    return this._http.get(`/admin/${id}/unblock`)
  }

  storeAdminData(token) {
    localStorage.setItem('Atoken', token);
    this.authToken = token;
  }

  getAdminToken() {
    return localStorage.getItem('Atoken')
  }

  AdminLoggedIn() {
    return tokenNotExpired('Atoken');
  }

  loadToken() {
    const token = localStorage.getItem('Atoken');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
