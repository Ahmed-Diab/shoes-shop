import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';
import { AdminService } from '../../../services/admin.service';
import { tokenize } from '../../../../../node_modules/ngx-bootstrap/typeahead';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email: String;
  password: String;
  subscription:Subscription;
  cart:any = [];
  constructor(
    private _admin: AdminService,
    private _router: Router,
    private _flashMessages: FlashMessagesService,
  ) {  }

  ngOnInit() {
    window.scrollTo(0, 0);  
  }
  //  on login submit function
  onLoginSubmit() {
    const admin = {
      email: this.email,
      password: this.password
    }
    if (this.email == undefined || this.password == undefined) {
      window.scrollTo(0, 0)
      this._flashMessages.show('plz fill  all fields', {cssClass: 'alert-danger', timeout: 5000});
    }else{
      this._admin.loginAdmin(admin).subscribe((res:any)=> { 
        if(res.success) {
          this._admin.storeAdminData(res.token)
            this._router.navigate(['/admin']);
          }else {
          let y = document.querySelector('.form');
          y.classList.add('animate')
          setTimeout(()=>{
            window.scrollTo(0, 0);
            this._flashMessages.show(res.errMSG, {cssClass: 'alert-danger', timeout: 5000});
            y.classList.remove('animate')
          }, 1100);
        }
      },
      (error)=>{
        window.scrollTo(0, 0 );
        this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
      });
      }
    }
}
 