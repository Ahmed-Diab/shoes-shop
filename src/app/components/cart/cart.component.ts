import { Component, OnInit, Renderer } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalprice: any;
  // global vars
  data:any = [];
  cartLength:any;
  total:any;
  totalQut:any;
  quntty:number;
  globalListener: any;
constructor(
  private service:ServicesService,
  private _route:Router,
  private renderer: Renderer,
  private _auth:AuthService,
  private _router:Router
) { }
// private productAddedSource = new Subject<any>()
ngOnInit() {
      let items = [] = JSON.parse(localStorage.getItem('carts')) || [];
      this.service.changeData(items.length);
      this.data = items;
// to make window scroll top
      window.scrollTo(0,0)
  // // get item length
  this.cartLength = items.length;
  // // to get total price
  var itemsPrice = [];
  var itemsQut = [];
  for (let i = 0; i < this.data.length; i++) {
    const element = this.data[i];
    let g = element.price * element.qut;
    let qut = element.qut;
    itemsPrice.push(g);
    itemsQut.push(qut);
  } // end for
  var totalPrice = itemsPrice.reduce(function(a, b) { return a + b; }, 0);
  var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
  this.totalQut = totalQut
  this.total = totalPrice;
  localStorage.setItem('totalPrice', JSON.stringify(this.total));
} // end ngOnInit

//remove item
removeItemById(id:string){
var products = [] = JSON.parse(localStorage.getItem('carts')) || [];

// let index:number = -1;
for (let i = 0; i < products.length; i++) {
  const item = products[i]
  const item2 = this.data[i];
  if(item.id == id || item2 == id){
      products.splice(i, 1);
      this.data.splice(i, 1);
// to change pasket items length
      this.service.changeData(products.length);
      this.total -= item.price;
      localStorage.setItem('carts', JSON.stringify(products)); 
      break;
  } // en if
} // end for 
}// end remove item
plusQut(product){
let id = product.id;
var products = [] = JSON.parse(localStorage.getItem('carts')) || [];
// to get product id from localStorge and this.data
let changeCarts = products.find((x=>{return  x.id === id}));
let changeData = this.data.find((x=>{return  x.id === id;}));
// to cahnge prodct qut
// if(product.sp_category === 'Bags' || 'accesories'){
if (product.qut < product.itemQut) {
  changeData.qut++;
  changeCarts.qut++;
}else{
  changeData.qut = product.itemQut;
}
// to change total price and total qut
var itemsPrice = [];
var itemsQut = [];
for (let i = 0; i < this.data.length; i++) {
    const element = this.data[i];
    let g = element.price * element.qut;
    let qut = element.qut;
    itemsPrice.push(g);
    itemsQut.push(qut);
  } // end for
  let totalPrice = itemsPrice.reduce(function(a, b) { return a + b; }, 0);
  let totalQut   = itemsQut.reduce(function(a, b) { return a + b; }, 0);
  this.totalQut  = totalQut
  this.total     = totalPrice;
  localStorage.setItem('carts', JSON.stringify(products));
  localStorage.setItem('totalPrice', JSON.stringify(this.total));
} // end change quntty plus

// change quntty to minus
minusQut(id){
  var products = [] = JSON.parse(localStorage.getItem('carts')) || [];
// to get product id from localStorge and this.data
  let changeCarts = products.find((x=>{return  x.id === id}));
  let changeData = this.data.find((x=>{return  x.id === id;}));
  changeData.qut--;
  changeCarts.qut--;
// to remove item if quntty < 1
if(changeData.qut < 1){
  for (let i = 0; i < products.length; i++) {
    const item = products[i]
    const item2 = this.data[i];
    if(item.id == id || item2 == id){
        products.splice(i, 1);
        this.data.splice(i, 1);
// to change pasket items length
        this.service.changeData(products.length);
        this.total -= item.price;
        localStorage.setItem('carts', JSON.stringify(products)); 
        break;
    }// end if
  } // end for 
}// end remove item if quntty < 1

  // to change total price and total qut
  var itemsPrice = [];
  var itemsQut = [];
  for (let i = 0; i < this.data.length; i++) {
    const element = this.data[i];
    let g = element.price * element.qut;
    let qut = element.qut;
    itemsPrice.push(g);
    itemsQut.push(qut);
  } // end for
  var totalPrice = itemsPrice.reduce(function(a, b) { return a + b; }, 0);
  var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
  this.totalQut = totalQut
  this.total = totalPrice;
localStorage.setItem('carts', JSON.stringify(products));
localStorage.setItem('totalPrice', JSON.stringify(this.total));
}// end change quntty to minus

openCheckout(t) {
if (!this._auth.loggedIn()) {
  this._router.navigate(['/login']);
}else{
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
    locale: 'auto',
    token: function (token: any) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
    }
  });
  let o = t * 100

  handler.open({
    name: 'shoes shop',
    description: 'shoes shop',
    amount: o
  });

  this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
    handler.close();
  });
}

}

}
