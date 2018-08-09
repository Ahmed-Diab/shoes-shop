import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  username:string;
  email:string;
  message:string;
    constructor(
      private _services:ServicesService,
      private _flashMessages:FlashMessagesService
    ) { }
  
    ngOnInit() {
      window.scrollTo(0, 0);

    }
  
    sendMessage(){
      let newMessage = {
        username : this.username,
        email    : this.email,
        message  : this.message
      }
      this._services.postMessages(newMessage).subscribe((res:any)=>{
        if (res.success) {
          window.scrollTo(0, 0);
          this._flashMessages.show(res.MSG, {cssClass:'alert-success', timeout:3000})
          this.email    = '';
          this.username = '';
          this.message  = '';
        }else{
          window.scrollTo(0, 0);
          this._flashMessages.show(res.errMSG, {cssClass:'alert-danger', timeout:3000})

        }
      },
      // if error 
      (error:any) =>{
        window.scrollTo(0, 0);
        this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 20000 })
      });
      console.log(this.email)
    }
}
