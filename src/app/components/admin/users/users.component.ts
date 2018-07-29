import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  subscribtion:Subscription;
  users:any;
  spinner:boolean = true;
  constructor(
    public _services:ServicesService,
    private _flash_messages:FlashMessagesService
  ) {  }

  ngOnInit() {
    this.subscribtion = this._services.getUsers().subscribe((res:any)=>{
      if (res.success) {
        this.users = res.all_users;
        this.spinner = false;
      }else{
        this.spinner = false;
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    },
    // if error 
    (error:any) =>{
      this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
      this.spinner = false;
    })
    
  }
  

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

}
