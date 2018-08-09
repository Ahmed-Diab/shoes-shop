import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { throwError, BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url='';
  // url:string = 'http://localhost:3000';
  
  // to make share data in all componant
  private dataSrc = new BehaviorSubject<number>(0);
  crentData = this.dataSrc.asObservable();
  constructor(
    private _http:HttpClient,
    private _router:Router
  ) { }
    // to change data sharing
    changeData(num){
      this.dataSrc.next(num)
    }

  getShoes(){
    return this._http.get(`${this.url}/product`).pipe( catchError(this.handleError));
  }
  // cart 
  getCart(){
    return this._http.get(`${this.url}/cart`).pipe( catchError(this.handleError));
  }
  minusCart(id){
    return this._http.get(`${this.url}/cart/minus/${id}/cart`).pipe( catchError(this.handleError));
  }
  plusCart(id, size){
    return this._http.get(`${this.url}/cart/plus/${id}/${size}/cart`).pipe( catchError(this.handleError));
  }
  getCartById(id, size){
    return this._http.get(`${this.url}/cart/${id}/${size}`).pipe( catchError(this.handleError));
  }
  removeCart(id){
    return this._http.get(`${this.url}/cart/remove/${id}/remove`).pipe( catchError(this.handleError));
  }

  getMessages(){
    return this._http.get(`${this.url}/message`).pipe( catchError(this.handleError))
  }

  postMessages(message){
    return this._http.post(`${this.url}/message`, message).pipe( catchError(this.handleError))
  }

  removeMessages(id){
    return this._http.get(`${this.url}/message/${id}/remove`).pipe( catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(
        'Something bad happened; please try again later.' + error.message);
    } else {
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };
  
}
