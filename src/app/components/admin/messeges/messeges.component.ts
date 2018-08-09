import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-messeges',
  templateUrl: './messeges.component.html',
  styleUrls: ['./messeges.component.scss']
})
export class MessegesComponent implements OnInit, OnDestroy {
  messages: any = [];
  subscribtion:Subscription
  constructor(
    private _services:ServicesService,
    private _flashMessages:FlashMessagesService
  ) { }

  ngOnInit() {
    this.subscribtion = this._services.getMessages().subscribe((res:any)=>{
      if(res.success){
        this.messages = res.messages
      }else{
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG,{cssClass:'alert-success', timeout:3000})
      }

    }, (error)=>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message, {cssClass:'alert-danger', timeout:3000})

    })
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }

}
