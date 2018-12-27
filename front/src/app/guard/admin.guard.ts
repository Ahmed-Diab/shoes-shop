import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _router:Router,
    private _admin:AdminService
  ){ }
  canActivate() {
    if(this._admin.AdminLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/admin/login']);
      return false;
    }
  }
}
