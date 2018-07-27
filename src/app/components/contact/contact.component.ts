import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  ame:string;
  email:string;
  message:string;
    constructor() { }
  
    ngOnInit() {
      window.scrollTo(0, 0);

    }
  
    sendMessage(){
      console.log(this.email)
    }
}
