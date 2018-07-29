import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
// import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  qut : any = [];
  showen : any;
  constructor(
    private _services:ServicesService,
    private _auth:AuthService,
    private _router:Router,
  ) { }

  ngOnInit() {
    this._services.crentSucsess.subscribe((su:any) =>{this.showen = su})
    var items= [];
    this._services.crentData.subscribe((data:number) =>{this.qut = data})
    items.push(JSON.parse(localStorage.getItem('carts')));
    if (items.length >= 0) {
      this.qut = 0;

    }else{
      this.qut = items
    }
    this._services.changeData(this.qut.length);
  }

  onLogoutClick() {
    this._services.changeSuc(false);
    this._services.changeData(0);
    this._auth.logout();
    this._router.navigate(['/login']);
    return false;
  }
}


