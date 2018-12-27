import { Component, OnInit, ElementRef } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';
import { Title } from '../../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // global vars
  username: string;
  email: string;
  password: string;
  repassword:string;
  imagesURL: string = '../../../assets/images/default-user-image.png';

  constructor(
    private _validateService: ValidateService,
    private _auth: AuthService,
    private _router: Router,
    private element: ElementRef,
    private _services:ServicesService,
    private _flashMessages: FlashMessagesService,
    private _title:Title
  ) {  }

  ngOnInit() {
    this._title.setTitle("Shoes Shop | Register")
    window.scrollTo(0, 0);
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

  // registry submit function
  onRegisterSubmit() {
    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      repassword:this.repassword
    }

    // Required Fields
    if(!this._validateService.validateRegister(user)) {
      window.scrollTo(0, 0);
      this.username = '';
      this.password = '';
      this.email = '';
      this._flashMessages.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      window.scrollTo(0, 0);
      return false;
    }

    // Validate Email
    if(!this._validateService.validateEmail(user.email)) {
      window.scrollTo(0, 0);
    this._flashMessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
    window.scrollTo(0, 0);
      return false;
    }

    if (user.password != user.repassword) {
      window.scrollTo(0, 0);
      this._flashMessages.show('password fied must be the same repassword', {cssClass: 'alert-danger', timeout: 3000});
      this.password = '';
      this,this.repassword = '';
      window.scrollTo(0, 0);
      return false;
      
    }
 // locate the file element meant for the file upload.
 let inputEl: HTMLInputElement = this.element.nativeElement.querySelector('#user_image');
 //create a new fromdata instance
         let formData = new FormData();
         if (inputEl.files.length !== 1) {
          window.scrollTo(0, 0);
          this._flashMessages.show('PLZ select profile image', {cssClass: 'alert-danger', timeout: 3000});
          window.scrollTo(0, 0);
          return false;
         }
 //check if the filecount is greater than zero, to be sure a file was selected.
  formData.append("user_image", inputEl.files[0]);
  //   // Register user
  formData.append('username', this.username)
  formData.append('password', this.password)
  formData.append('email', this.email)


    this._auth.registerUser(formData).subscribe((data:any) => {
    if(data.success) {
      this._router.navigate(['/login']);
    } else {
      window.scrollTo(0, 0);
      this._flashMessages.show(data.errMSG, {cssClass: 'alert-danger', timeout: 10000});
      this._router.navigate(['/register']);
      window.scrollTo(0, 0);
    }
  },
  (error)=>{
    window.scrollTo(0, 0);
    this._flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000});
  });
  
} // end on registre submit

}
