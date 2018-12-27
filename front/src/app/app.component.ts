import { Component, OnInit } from '@angular/core';
import {trigger,  state, style,  animate, transition, query, group } from '@angular/animations';
import { ServicesService } from './services/services.service';
import { routerTransition } from './modules/anmation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[routerTransition]
  
})
export class AppComponent {
  title = 'app';
  spinner:Boolean = false;
  itemsLength: any;
  constructor(
    private _services:ServicesService,
  ) { 
    // window load function

    window.addEventListener('load', function() {
      var sp = document.getElementById('sp');
      document.body.style.overflow = 'hidden';
      if (sp.hasAttribute('blo')) {
        document.body.style.overflow = 'auto';
        sp.style.display = 'none';
      }
    });
  }
  ngOnInit() {
    var items:any = [];
    window.scrollTo(0, 0);
     this._services.getCart().subscribe((res:any)=>{
      items = res.cart;
     this._services.changeData(items.items.length);
   });

  }

  getDepth(outlet){
    return  outlet.activatedRouteData.depth || null;
  }

}
