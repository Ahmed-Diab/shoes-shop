import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { FlashMessagesService } from '../../../../node_modules/angular2-flash-messages';
import { Router } from '../../../../node_modules/@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // global vars
  data:any = [];
  spinner = true;
  stro:string = 'select sort by';
  subscription:Subscription

  constructor(
    private _route:Router,
    private _services:ServicesService,
    private _flash_messages:FlashMessagesService
    
  ) { 

  }
  ngOnInit() {
    window.scrollTo(0,0);
    // get data from url
    this.subscription = this._services.getShoes().subscribe((res:any)=>{
      if (res.success) {
        this.data = res.data;
        this.spinner = false;  
      }
      if(!res.success){
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    },
    // if error 
    (error:any) =>{
      this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 20000 });
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  // to see product info
  ViewProduct(_id){
    this._route.navigate(['/product_info/',{id:_id}])
  }
 

  storBy(){
    if (this.stro === 'from old to new') {
      let k = this._services.storFromlow(this.data, 'updated_date');
      this.data = k;
    }
    if (this.stro === 'from new to old') {
      let k = this._services.storFromHeight(this.data, 'updated_date');
      this.data = k;
    }

    if (this.stro === 'price height to low') {
      let k = this._services.storFromHeight(this.data, 'price');
      this.data = k;
    }
    if (this.stro === 'price low to height') {
      let e = this._services.storFromlow(this.data, 'price');
      this.data = e;
    }
    if (this.stro === 'from Z to A') {
      let e = this._services.storFromHeight(this.data, 'title');
      this.data = e;
    }
    if (this.stro === 'from A to Z') {
      let e = this._services.storFromlow(this.data, 'title');
      this.data = e;
    }
  }
}
