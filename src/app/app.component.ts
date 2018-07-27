import { Component, OnInit } from '@angular/core';
import {trigger,  state, style,  animate, transition, query, group } from '@angular/animations';
import { ServicesService } from './services/services.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnimation', [
      transition('home => *', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'10px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('* => home', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('* => cart', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('cart => *', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('product_info => *', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('login => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('contact => login', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('register => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('contact => register', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('contact => profile', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('register => login', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('register => profile', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('login => register', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('login => profile', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('profile => login', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('profile => register', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('profile => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
    ])
  ]
  
})
export class AppComponent {
  title = 'app';
  spinner:Boolean = false;

  
  constructor(
    private _services:ServicesService
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
    window.scrollTo(0, 0);

  }

  getDepth(outlet){
  return  outlet.activatedRouteData.depth || null;
  }

}
