import {animate, animateChild, group, query as q, sequence, state, style, transition, trigger} from '@angular/animations';

export function query(s, a) {
    return q(s, a, {optional: true});
}

export const routerTransition = trigger('routeAnimation', [
    transition('home => *', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%)'})),
      query(':enter, :leave', style({position:'absolute', top:'10px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('* => home', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('* => cart', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('cart => *', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('product_info => *', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('login => contact', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('contact => login', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('register => contact', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('contact => register', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('contact => profile', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('register => login', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('register => profile', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('login => register', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('login => profile', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(-100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('profile => login', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('profile => register', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('profile => contact', [
      style({height:'!'}),
      query(':enter', style({transform:'translateX(100%'})),
      query(':enter, :leave', style({position:'absolute', top:'15px', left:0, right:0})),
      group([
        query(':leave', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(-100%)'}))]),
        query(':enter', [animate('.3s cubic-bezier(.35, .0, .25, 1)', style({transform:'translateX(0)'}))])
      ])
    ]),
  ])