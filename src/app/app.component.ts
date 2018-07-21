import { Component, OnInit } from '@angular/core';
import {trigger,  state, style,  animate, transition, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnimation', [
      transition('home => *', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('skills => portfolio', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('skills => about', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('skills => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('portfolio => about', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('portfolio => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('about => contact', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('contact => *', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('about => portfolio', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('about => skills', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('about => home', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('portfolio => skills', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('portfolio => home', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
      transition('skills => home', [
        style({height:'!'}),
        query(':enter', style({transform:'translateX(-100%'}), { optional: true }),
        query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0}),{ optional: true }),
        group([
          query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
          query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
        ])
      ]),
    ])
  ]
  
})
export class AppComponent {
  title = 'app';
  spinner:Boolean = false;

  
  constructor() { 
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
