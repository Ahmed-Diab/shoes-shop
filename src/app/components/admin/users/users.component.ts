import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  subscribtion:Subscription;
  users:any;
  constructor(
    public _services:ServicesService
  ) { }

  ngOnInit() {
    this._services.getUsers().subscribe((res:any)=>{
      if (res.success) {
        this.users = res.all_users;
        console.log(this.users)
      }else{
        console.log(res)
      }
    })
  }

  // ngOnDestroy(){
  //   this.subscribtion.unsubscribe();
  // }

}
