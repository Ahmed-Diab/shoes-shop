import { Component, OnInit, ElementRef } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';

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
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    private _services:ServicesService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
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
    if(!this.validateService.validateRegister(user)) {
      this.username = '';
      this.password = '';
      this.email = '';
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      window.scrollTo(0, 0);
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
    window.scrollTo(0, 0);
      return false;
    }

    if (user.password != user.repassword) {
      this.flashMessage.show('password fied must be the same repassword', {cssClass: 'alert-danger', timeout: 3000});
      this.password = '';
      this,this.repassword = '';
      window.scrollTo(0, 0);
      return false;
      
    }
 // locate the file element meant for the file upload.
 let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#user_image');
 //create a new fromdata instance
         let formData = new FormData();
         if (inputEl.files.length !== 1) {
          this.flashMessage.show('PLZ select profile image', {cssClass: 'alert-danger', timeout: 3000});
          window.scrollTo(0, 0);
          return false;
         }
 //check if the filecount is greater than zero, to be sure a file was selected.
  formData.append("user_image", inputEl.files[0]);
  //   // Register user
  formData.append('username', this.username)
  formData.append('password', this.password)
  formData.append('email', this.email)


    this.authService.registerUser(formData).subscribe((data:any) => {
    if(data.success) {
      this.router.navigate(['/login']);
      
    } else {
      this.flashMessage.show(data.errMSG, {cssClass: 'alert-danger', timeout: 10000});
      this.router.navigate(['/register']);
      window.scrollTo(0, 0);
    }
  },(err)=>{
    this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 10000});
  }
);
} // end on registre submit

}
