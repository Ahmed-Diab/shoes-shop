import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap,  Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
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
    private _flashMessages:FlashMessagesService,
  ) { }


  ngOnInit() {
    let u = JSON.parse(localStorage.getItem('carts')) || [];
    this._services.changeData(u.length);
    window.scrollTo(0, 0);
// start if pathname = men
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

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
// addtosession(pro){
//  let id = pro._id;
//  let data = {
//    name:"Ahmed",
//    age:28
//  }
//  this._cart.cartLink(data, id).subscribe((res:any)=>{
//    sessionStorage.setItem('cart', res.cart)
//    console.log(res);
//  })

// }

// add product to carts
  addtoCart(product){
    if (product.size_41 >= 1 || product.size_42 >= 1 || product.size_43 >= 1) {
      var carts = [] = JSON.parse(localStorage.getItem('carts')) || [];
      var id = product._id;
        if (this.size === undefined || '' || null) {
          window.scrollTo(0, 0)
          this._flashMessages.show('plz select your size', { cssClass: 'alert-danger', timeout: 3000 });
        }else{
          var item = carts.find((o)=>{return o.id === id+'size_'+this.size});
          if (item) {
            if(item.size === this.size){
              if (item.qut < item.itemQut) {
                item.qut++;
                this._flashMessages.show('saved item quntty = ' + item.qut, { cssClass: 'alert-success', timeout: 1000 });
              }else{
                item.qut = item.itemQut;
                this._flashMessages.show('we have only ' + item.qut + ' pc in stoke and you will pay those', { cssClass: 'alert-success', timeout: 4000 });
              }
              // item.qut++;
              window.scrollTo(0, 0)
              this.itemsLength = carts.length;
              this._services.changeData(this.itemsLength);
              localStorage.setItem('carts', JSON.stringify(carts));
            }
            else if(item.size !== this.size){
              item.id = item.id + 'size_'+this.size;
                this.itemsLength = carts.length;
                this._services.changeData(this.itemsLength +=1);
                localStorage.setItem('carts', JSON.stringify(carts));
                window.scrollTo(0, 0)
                this._flashMessages.show('saved', { cssClass: 'alert-success', timeout: 1000 });
            } // end else if
            } else if(!item){
                if(this.size === '41') {
                  this.maxQut = product.size_41;
                } else if(this.size === '42'){
                  this.maxQut = product.size_42;
                } else if(this.size === '43'){
                  this.maxQut = product.size_43;
                } else if(this.size === '44'){
                  this.maxQut = product.size_44;
                } else if(this.size === '45'){
                  this.maxQut = product.size_45;
                } else if(this.size === '46'){
                  this.maxQut = product.size_46;
              }
              let newItem = {
                title: product.title,
                id: product._id+'size_'+this.size,
                price: product.price,
                img:product.images[0],
                qut: 1,
                size:this.size,
                category:product.category,
                itemQut:this.maxQut
                };
              carts.push(newItem);
              this._services.changeData(carts.length);
              localStorage.setItem('carts', JSON.stringify(carts));
              window.scrollTo(0, 0);
              this._flashMessages.show('saved', { cssClass: 'alert-success', timeout: 1000 });
              }
        }
    }else{
      window.scrollTo(0, 0);
      this._flashMessages.show('cant save check item qut avilobal', { cssClass: 'alert-danger', timeout: 3000 });
    }
  
    }      
  }
  

