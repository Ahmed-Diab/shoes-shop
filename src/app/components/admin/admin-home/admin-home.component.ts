import { Component, OnInit } from '@angular/core';
import { Title } from '../../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private _title:Title
  ) { }

  ngOnInit() {
    this._title.setTitle("Shoes Shop | Admin ")

  }

}
