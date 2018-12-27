import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', function() {
      let scroll = document.getElementById('scrollTop');
      if (window.scrollY > 100) {
        scroll.classList.add('display-block');
        scroll.classList.remove('display-none');
      }else{
        scroll.classList.add('display-none');
        scroll.classList.remove('display-block');
      }
      });
  }

  scrollTop(){
      window.scrollTo(0, 0 );
  }

}
 