import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  // global vars
  username: string;
  email: string;
  password: string;
  repassword:string;

  constructor(
    private _validateService: ValidateService,
    private _admin: AdminService,
    private _router: Router,
    private _flashMessages: FlashMessagesService) { }

  ngOnInit() {
        window.scrollTo(0, 0);
  }

  onRegisterSubmit() {
    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      repassword:this.repassword
    }

    // Required Fields
    if(!this._validateService.validateRegister(user)) {
      window.scrollTo(0, 0);
      this.username = '';
      this.password = '';
      this.email = '';
      this._flashMessages.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this._validateService.validateEmail(user.email)) {
      window.scrollTo(0, 0 );
    this._flashMessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (user.password != user.repassword) {
      window.scrollTo(0, 0 );

      this._flashMessages.show('password fied must be the same repassword', {cssClass: 'alert-danger', timeout: 3000});
      this.password = '';
      this,this.repassword = '';
      return false;
      
    }

    let newAdmin = {
      username:this.username,
      email:this.email,
      password:this.password
    }
  this._admin.registerAdmin(user).subscribe((data:any) => {
    if(data.success) {
      window.scrollTo(0, 0 );
      this._router.navigate(['/login']);
    } else {
      window.scrollTo(0, 0 );
      this._flashMessages.show(data.errMSG, {cssClass: 'alert-danger', timeout: 10000});
      this._router.navigate(['/register']);
      window.scrollTo(0, 0);
    }
  },
  (error)=>{
    window.scrollTo(0, 0 );
    this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
  });
} // end on registre submit

}
