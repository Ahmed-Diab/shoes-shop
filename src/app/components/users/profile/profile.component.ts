import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any;
  i: any;
  constructor(
    private _router:Router,
    private _auth:AuthService
  ) { }

  ngOnInit() {
    let invok;
    var itemsPrice = [];
    this._auth.getProfile().subscribe((data:any) => {
      this.user = data.user;
    },
     err => {
       return false;
     });



    }


}
