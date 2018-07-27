import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  // public  su: boolean = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private flashMessage: FlashMessagesService,
    private _services:ServicesService
  ) { 
    
  }

  ngOnInit() {
        // to make window scroll top
        window.scrollTo(0,0)
  }
  //  on login submit function
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    if (this.username == undefined || this.password == undefined) {
      window.scrollTo(0, 0)
      this.flashMessage.show('plz fill  all fields', {cssClass: 'alert-danger', timeout: 5000});
    }else{
      this._auth.loginUser(user).subscribe((data:any)=> {
        if(data.success) {
          if (data.user.username === 'admin') {
            this._services.changeSuc(true);
            this._router.navigate(['/admin']);
            this._auth.storeUserData(data.token, data.user);
          }else{
            this._services.changeSuc(true);
            this._auth.storeUserData(data.token, data.user);
            this._router.navigate(['/profile']);
          }

          
        } else {
          window.scrollTo(0, 0);
          this.flashMessage.show(data.errMSG, {cssClass: 'alert-danger', timeout: 5000});
          this._router.navigate(['/login']);
        }
    },
    (err)=>{
      this.flashMessage.show(err, {cssClass: 'alert-danger', timeout: 10000});
    });
}
    }

}
 