import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ServicesService } from '../../services/services.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number;
  card_number:number;
  card_name:string;
  cvv:number;
  year:number;
  month:number;
  cardI:any;
  constructor(
    private _flash_message:FlashMessagesService,
    private _service:ServicesService,
    private _auth:AuthService
  ) { }

  ngOnInit() {
    let total = localStorage.getItem('totalPrice');
    this.totalPrice = parseInt(total);
  }

// start bay now button
  bayNow(){
    console.log('check')
    let items = [] = JSON.parse(localStorage.getItem('carts')) || [];
    let totalPrice = [] = JSON.parse(localStorage.getItem('totalPrice')) || [];
    let arr = []
    let saveInvok;
    for (const i of items) {
       saveInvok = {
        title:i.title,
        id:i.id,
        price:i.price,
        images:i.img,
        qut:i.qut,
        size:i.size,
        sp_category:i.sp_category,
        category:i.category,
        totalPrice:totalPrice,
        date:new Date
      }
      arr.push(saveInvok)
    }
    this._service.changeData(items.length);
    let cartInfo = {
      card_name:this.card_name,
      card_number:this.card_number,
      cvv:this.cvv,
      month:this.month,
      year:this.year
    } // end 
    let userInfo = JSON.parse(localStorage.getItem('user'));
    let id = userInfo._id
    this._auth.bayDone(arr, id).subscribe((res)=>{
      console.log(res)
      if (res.success) {
        this._auth.getProfile().subscribe((profile:any) => {
          console.log(profile)
          let newData:any = [];
          newData = profile.user;
        let u = localStorage.setItem('user', JSON.stringify(newData));
        },
         err => {
          this._flash_message.show(err, {cssClass: 'alert-danger', timeout: 5000});
          console.log(err)
           return false;
         });// end if err in get profile
      } // end is success
    }, (err)=>{
      console.log(err)

      this._flash_message.show(err.message, {cssClass: 'alert-danger', timeout: 5000})
    })// end if err in get bay done

  }// end bay now button

}
