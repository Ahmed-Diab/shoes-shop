import { Component, OnInit, Renderer } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalprice: any;
  data:any = [];
  cartLength:any;
  total:any;
  totalQut:any;
  quntty:number;
  globalListener: any;
constructor(
  private service:ServicesService,
  private renderer: Renderer,
  private _auth:AuthService,
  private _router:Router
) { }
// private productAddedSource = new Subject<any>()
ngOnInit() {
  this.service.getCart().subscribe((res:any)=>{
    this.data = res.cart;
  })

} // end ngOnInit
//remove item
removeItemById(id:string){
  this.service.removeCart(id).subscribe((res:any)=>{
    this.data = res.cart;
    this.service.changeData(this.data.items.length);

  })
}// end remove item

plusQut(id, size){
  this.service.plusCart(id, size).subscribe((res:any)=>{
    this.data = res.cart;
    this.service.changeData(this.data.items.length);

  });
} // end change quntty plus

// change quntty to minus
minusQut(id){
  this.service.minusCart(id).subscribe((res:any)=>{
    this.data = res.cart;
    this.service.changeData(this.data.items.length);
  });
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
