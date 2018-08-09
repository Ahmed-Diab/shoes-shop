import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('formAnimatiom', [
      state('show', style({
        transform:'translate(0)'
        })),
      state('hide', style({
        transform:'translateX(-100px) translate(-100px)'

      })),
      transition('show => hide', animate('500ms ease-in')),
      transition('hide => show', animate('500ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  subscription:Subscription;
  cart:any = [];
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _flashMessages: FlashMessagesService,
    private _services:ServicesService
  ) {  }

  ngOnInit() {
    window.scrollTo(0, 0);  
  }
  //  on login submit function
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    if (this.username == undefined || this.password == undefined) {
      window.scrollTo(0, 0)
      this._flashMessages.show('plz fill  all fields', {cssClass: 'alert-danger', timeout: 5000});
    }else{
      this._auth.loginUser(user).subscribe((data:any)=> {
        if(data.success) {
          this._services.getCart().subscribe((res:any)=>{
            this.cart = res.cart.items;
            if (this.cart.length >= 1) {
              this._auth.storeUserData(data.token, data.user);
              this._router.navigate(['/cart']);
            }else{
              this._auth.storeUserData(data.token, data.user);
              this._router.navigate(['/profile']);
            }
        })
      } else {
          let y = document.querySelector('.form');
          y.classList.add('animate')
          setTimeout(()=>{
            window.scrollTo(0, 0);
            this._flashMessages.show(data.errMSG, {cssClass: 'alert-danger', timeout: 5000});
            y.classList.remove('animate')
          }, 1100);
        }
    },
      (error)=>{
        window.scrollTo(0, 0);
        this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
      });
      }
    }
}
 