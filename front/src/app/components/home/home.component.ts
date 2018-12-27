import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { FlashMessagesService } from '../../../../node_modules/angular2-flash-messages';
import { Router } from '../../../../node_modules/@angular/router';
import { ServicesService } from '../../services/services.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';

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
  subscription:Subscription;
  url:string;
  lengthData = this.data.length


  constructor(
    private _route:Router,
    private _services:ServicesService,
    private _flash_messages:FlashMessagesService,
    private _title:Title
    
  ) {  }
  ngOnInit() {
    this._title.setTitle("Shoes Shop")
    window.scrollTo(0, 0);
    this.url = this._services.url;
    // get data from url
    this.subscription = this._services.getShoes().subscribe((res:any)=>{
      if (res.success) {
        this.data = res.data;
        this.spinner = false;
      }
      if(!res.success){
        window.scrollTo(0, 0);
        this.spinner = false;

        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this.spinner = false;
      this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 20000 });
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  // to see product info
  ViewProduct(_id){
    this._route.navigate(['/product_info/', {id:_id}])
  }
  
  storBy(e){
    if (e === 'price height to low') {
        this.data.sort((a, b)=>{
          return parseFloat(b.price) - parseFloat(a.price);
         })
    }
    if (e === 'price low to height') {
      this.data.sort((a, b)=>{
        return parseFloat(a.price) - parseFloat(b.price);
       })
    }
    if (e === 'from Z to A') {
        this.data.sort((a, b)=>{
          if(a.title < b.title){
            return 1
          }
          if(a.title > b.title){
            return -1
          }else{
            return 0;
          }
        })
    }
    if (e === 'from A to Z') {
      this.data.sort((a, b)=>{
        if(a.title > b.title){
          return 1
        }
        if(a.title < b.title){
          return -1
        }else{
          return 0;
        }
      })

    }
  }
}
