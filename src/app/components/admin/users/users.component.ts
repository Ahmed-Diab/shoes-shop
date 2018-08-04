import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  subscribtion:Subscription;
  users:any;
  spinner:boolean = true;
  username:string;
  password: string;
  email: string;
  _id: string;
  constructor(
    public _admin:AdminService,
    private _flash_messages:FlashMessagesService,
    private el:ElementRef
  ) {  }

  ngOnInit() {
    this.subscribtion = this._admin.getAllUsers().subscribe((res:any)=>{
      if (res.success) {
        this.users = res.all_users;
        this.spinner = false;
      }else{
        this.spinner = false;
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    },
    // if error 
    (error:any) =>{
      this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
      this.spinner = false;
    })
    
  }
  

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  removeUser(id){
    this._admin.removeUser(id).subscribe((res:any)=>{
      if (res.success) {
        window.scrollTo(0, 0);
        this._flash_messages.show(res.MSG , { cssClass: 'alert-success', timeout: 20000 });
        this._admin.getAllUsers().subscribe((res:any)=>{
          if (res.success) {
            this.users = res.all_users;
            this.spinner = false;
          }else{
            this.spinner = false;
            this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
          }
        },
        // if error 
        (error:any) =>{
          this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
          this.spinner = false;
        })
      }else{
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }

    })
  }
  editOldUser(id){ 
  let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#user_edit_image');
  let FD= new FormData();
  FD.append("user_edit_image", inputEl.files[0]);
  FD.append('username', this.username)

  this._admin.editUser(FD, id).subscribe((res:any)=>{
    if (res.success) {
      window.scrollTo(0, 0)
      this._flash_messages.show(res.MSG , { cssClass: 'alert-success', timeout: 20000 });
      var overlay = document.querySelector('.overlay');
      overlay.classList.remove('display');
      this._admin.getAllUsers().subscribe((res:any)=>{
        if (res.success) {
          this.users = res.all_users;
          this.spinner = false;
        }else{
          this.spinner = false;
          this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
        }
      },
      // if error 
      (error:any) =>{
        this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
        this.spinner = false;
      })
    }else{
      this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 200000 })

    }
  })

  }
  editUserForm(user){
    var overlay = document.querySelector('.overlay');
    overlay.classList.add('display');
    this.username = user.username;
    this.password = user.password;
    this.email    = user.email;
    this._id = user._id;
  }

  blockUser(id){
    this._admin.blockUser(id).subscribe((res:any)=>{
      if(res.success){
        this._admin.getAllUsers().subscribe((res:any)=>{
          if (res.success) {
            this.users = res.all_users;
            this.spinner = false;
          }else{
            this.spinner = false;
            this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
          }
        },
        // if error 
        (error:any) =>{
          this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
          this.spinner = false;
        })
      }else{
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 5000 });

      }
    })
  }

  unblockUser(id){
    this._admin.unblockUser(id).subscribe((res:any)=>{
      if(res.success){
        this._admin.getAllUsers().subscribe((res:any)=>{
          if (res.success) {
            this.users = res.all_users;
            this.spinner = false;
          }else{
            this.spinner = false;
            this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
          }
        },
        // if error 
        (error:any) =>{
          this._flash_messages.show(error.message , { cssClass: 'alert-danger', timeout: 200000 })
          this.spinner = false;
        })
      }else{
        this._flash_messages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 5000 });
      }
    })
  }


}
