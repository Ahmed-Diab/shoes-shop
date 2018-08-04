import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap,  Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { FlashMessagesService } from '../../../../node_modules/angular2-flash-messages';
import { product } from '../../modules/product';
import { Subscription } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  id:any;
  data:any;
  products:any;
  bigImg:any; 
  itemsLength:any;
  errorMessage;
  size:any;
  backUrl;
  key;
  options:any = [];
  pathName:string;
  allSizes: any = [];
  maxQut:number;
  subscription:Subscription

  constructor(
    private activteRoute:ActivatedRoute,
    private _services:ServicesService,
    private router:Router,
    private _flashMessages:FlashMessagesService
  ) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.subscription = this._services.getShoes().subscribe((res:any)=>{
    if (res.success) {
      this.data = res.data;
      this.activteRoute.paramMap.subscribe((params:ParamMap)=>{
        let id = params.get('id');
        var product = this.getByid(this.data, id)
        this.products = product;
      });
    }
    if (!res.success) {
      this.errorMessage = res.errMSG
    }
  });
  } // end ngOnInit

getByid(ar, _id) {
    var obj = ar.filter(function(node) {
        return node._id == _id;
    });
    return obj;   
}
// to see image in pig frame
changeImg(image){
  var bigImg = document.getElementById('bigImg');
  bigImg.setAttribute('src', '/images/'+image);
  window.scrollTo(bigImg.offsetTop,0)
}

// go back function
goBack(){
  return this.router.navigate([`/home`]);
}
 
addToSession(product){
  if (this.size === undefined || '' || null) {
    window.scrollTo(0, 0)
    this._flashMessages.show('plz select your size', { cssClass: 'alert-danger', timeout: 3000 });
  }else{
    let id = product._id;
    this.subscription = this._services.getCartById(id, this.size).subscribe((res:any)=>{
      let u = res.cart
      this.itemsLength = u.length;
      this._services.changeData(this.itemsLength);
      window.scrollTo(0, 0)
      this._flashMessages.show('saved', { cssClass: 'alert-success', timeout: 1000 });
    });
  }
}
   
ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
  

