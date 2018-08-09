import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
// import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  qut : any = [];
  seeCart : boolean = true;
  admin:boolean = false;
  constructor(
    private _services:ServicesService,
    private _auth:AuthService,
    private _router:Router,
    private _admin:AdminService
  ) { }

  ngOnInit() {
    this._services.crentData.subscribe((data:number) =>{this.qut = data})
    let items:any = [];
    this._services.getCart().subscribe((res:any)=>{
      items = res.cart;
      this.qut = items.length;
      this._services.changeData(items.items.length);

    })

    window.addEventListener('resize', ()=>{
      if (window.innerWidth >= 1198) {
        this.seeCart = false;
        
      }else{
        this.seeCart = true;
      }
    });

    if (window.innerWidth >= 1198) {
      this.seeCart = false;
      
    }else{
      this.seeCart = true;
    }
    
  }

  onLogoutClick() {
    this._auth.logout();
    this._router.navigate(['/login']);
    return false;
  }
  onAdminLogout() {
    this._admin.logout();
    this._router.navigate(['/admin/login']);
    return false;
  }
  to(){
    var s = document.querySelector('#small-nav');
    s.classList.toggle('collapse')
  }
  adminList(){
    var s = document.querySelector('#admin-nav');
    s.classList.toggle('collapse')
  }
}


