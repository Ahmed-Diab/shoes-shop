import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { throwError, BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url='';
  // url:string = 'http://localhost:3000';
  
  // to make share data in all componant
  private dataSrc = new BehaviorSubject<number>(0);
  private dataAdmin = new BehaviorSubject<boolean>(false);

  crentData = this.dataSrc.asObservable();
  crentAdmin = this.dataAdmin.asObservable();
  constructor(
    private http:HttpClient,
  ) { }
    // to change data sharing
    changeData(num){
      this.dataSrc.next(num)
    }
    changeAdmin(success){
      this.dataAdmin.next(success)
    }


  getShoes(){
    return this.http.get(`${this.url}/product`).pipe( catchError(this.handleError));
  }
  // cart 
  getCart(){
    return this.http.get(`${this.url}/cart`).pipe( catchError(this.handleError));
  }
  minusCart(id){
    return this.http.get(`${this.url}/cart/minus/${id}/cart`).pipe( catchError(this.handleError));
  }
  plusCart(id, size){
    return this.http.get(`${this.url}/cart/plus/${id}/${size}/cart`).pipe( catchError(this.handleError));
  }
  getCartById(id, size){
    return this.http.get(`${this.url}/cart/${id}/${size}`).pipe( catchError(this.handleError));
  }
  removeCart(id){
    return this.http.get(`${this.url}/cart/remove/${id}/remove`).pipe( catchError(this.handleError));
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
  
  storFromHeight(arr, p){
    return  arr.slice(0).sort((a, b)=> {
          return (a[p] < b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
        });
    }
    
  storFromlow(arr, p){
    return  arr.slice(0).sort((a, b)=> {
          return (a[p] > b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
        });
    }
}
