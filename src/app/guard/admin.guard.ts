import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _router:Router,
  ){ }
  canActivate() {
    let user:any = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this._router.navigate(['/login']);
      return false;
    }
    if(user.username === 'admin') {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
