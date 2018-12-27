import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { AdminService } from '../../../services/admin.service';
import { Title } from '../../../../../node_modules/@angular/platform-browser';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  newUsername: string;
  show = true;
  imagesURL: string;
  constructor(
    private _auth: AuthService,
    private _flashMessages: FlashMessagesService,
    private _admin: AdminService,
    private element: ElementRef,
    private _title: Title,
    private _services: ServicesService
  ) {  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._auth.getProfile().subscribe((data:any) => {
      this.user = data.user;
      this._title.setTitle("Shoes Shop | " + this.user.username)
      this.newUsername = this.user.username;
      this.imagesURL = '/users-images/'+this.user.image;
    },
    (error)=>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
    });
    }

    showForm(){
      this.imagesURL = '/users-images/'+this.user.image;
      this.show = false;

    }
      // to see images when selected
  onChange(file:any){
    for (var i = 0; i < file.length; i++) {
      var fi = file[i];
      var imageReader = new FileReader();
      imageReader.onload = (event:any)=>{
        this.imagesURL = event.target.result;
        }
      imageReader.readAsDataURL(fi);
      }
    }

    changeUsername(id){ 
        let inputEl: HTMLInputElement = this.element.nativeElement.querySelector('#user_edit_image');
        let FD= new FormData();
        FD.append("user_edit_image", inputEl.files[0]);
        FD.append('username', this.newUsername)
        this._admin.editUser(FD, id).subscribe((res:any)=>{
          if (res.success) {
            this.show = true;
            window.scrollTo(0, 0)
            this._flashMessages.show(res.MSG , { cssClass: 'alert-success', timeout: 3000 });
            this._auth.getProfile().subscribe((data:any) => {
              this.user = data.user;
              this._title.setTitle("Shoes Shop | " + this.user.username)
            },
            (error)=>{
              window.scrollTo(0, 0);
              this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
            });
          }else{
            window.scrollTo(0, 0);
            this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 })
          }
        },
        // if error 
        (error:any) =>{
          window.scrollTo(0, 0);
          this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
        })
      
        }

}
