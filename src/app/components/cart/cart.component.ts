import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { ServicesService } from '../../services/services.service';
import { FlashMessagesService } from '../../../../node_modules/angular2-flash-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  totalprice: any;
  data:any = [];
  cartLength:any;
  total:any;
  totalQut:any;
  quntty:number;
  globalListener: any;
  subscription:Subscription
constructor(
  private _services:ServicesService,
  private renderer: Renderer,
  private _auth:AuthService,
  private _router:Router,
  private _flashMessages:FlashMessagesService
) { }
// private productAddedSource = new Subject<any>()
ngOnInit() {
  this.subscription = this._services.getCart().subscribe((res:any)=>{
    this.data = res.cart;
  },  // if error 
  (error:any) =>{
    window.scrollTo(0, 0);
    this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
  })

} // end ngOnInit
ngOnDestroy() {
  this.subscription.unsubscribe()
}
//remove item
removeItemById(id:string){
  this._services.removeCart(id).subscribe((res:any)=>{
    this.data = res.cart;
    this._services.changeData(this.data.items.length);

  },
  // if error 
  (error:any) =>{
    window.scrollTo(0, 0);
    this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
  })
}// end remove item

plusQut(id, size){
  this._services.plusCart(id, size).subscribe((res:any)=>{
    this.data = res.cart;
    // this._flashMessages.show(res.MSG , { cssClass: 'alert-success', timeout: 3000 })
    this._services.changeData(this.data.items.length);
  },  // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
    })
} // end change quntty plus

// change quntty to minus
minusQut(id){
  this._services.minusCart(id).subscribe((res:any)=>{
    this.data = res.cart;
    this._services.changeData(this.data.items.length);
  },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
    })
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
