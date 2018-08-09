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
  users:any = [];
  spinner:boolean = true;
  username:string;
  password: string;
  email: string;
  _id: string;
  searchUsername:string;
  constructor(
    public _admin:AdminService,
    private _flashMessages:FlashMessagesService,
    private element:ElementRef
  ) {  }

  ngOnInit() {
    this.subscribtion = this._admin.getAllUsers().subscribe((res:any)=>{
      if (res.success) {
        this.users = res.all_users;
        this.spinner = false;
      }else{
        window.scrollTo(0, 0);
        this.spinner = false;
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this.spinner = false;
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
    })
    
  }
  

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  removeUser(id){
    this._admin.removeUser(id).subscribe((res:any)=>{
      if (res.success) {
        window.scrollTo(0, 0);
        this._flashMessages.show(res.MSG , { cssClass: 'alert-success', timeout: 3000 });
        this._admin.getAllUsers().subscribe((res:any)=>{
          if (res.success) {
            this.users = res.all_users;
            this.spinner = false;
          }else{
            window.scrollTo(0, 0);
            this.spinner = false;
            this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
          }
        },
        // if error 
        (error:any) =>{
          window.scrollTo(0, 0);
          this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
          this.spinner = false;
        })
      }else{
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
      this.spinner = false;
    })
  }
  editOldUser(id){ 
  let inputEl: HTMLInputElement = this.element.nativeElement.querySelector('#user_edit_image');
  let FD= new FormData();
  FD.append("user_edit_image", inputEl.files[0]);
  FD.append('username', this.username)
  this._admin.editUser(FD, id).subscribe((res:any)=>{
    if (res.success) {
      window.scrollTo(0, 0)
      this._flashMessages.show(res.MSG , { cssClass: 'alert-success', timeout: 3000 });
      var overlay = document.querySelector('.overlay');
      overlay.classList.remove('displayOverlay');
      this._admin.getAllUsers().subscribe((res:any)=>{
        if (res.success) {
          this.users = res.all_users;
          this.spinner = false;
        }else{
          window.scrollTo(0, 0);
          this.spinner = false;
          this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
        }
      },
      // if error 
      (error:any) =>{
        window.scrollTo(0, 0);
        this.spinner = false;
        this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
      })
    }else{
      window.scrollTo(0, 0);
      this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 })

    }
  },
  // if error 
  (error:any) =>{
    window.scrollTo(0, 0);
    this.spinner = false;
    this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
  })

  }
  editUserForm(user){
    var overlay = document.querySelector('.overlay');
    overlay.classList.add('displayOverlay');
    this.username = user.username;
    this.password = user.password;
    this.email    = user.email;
    this._id = user._id;
  }
// block user
  blockUser(id){
    this._admin.blockUser(id).subscribe((res:any)=>{
      if(res.success){
        this._admin.getAllUsers().subscribe((res2:any)=>{
          if (res2.success) {
            window.scrollTo(0, 0);
            this.users = res2.all_users;
            this.spinner = false;
            this._flashMessages.show(res.MSG,{cssClass:'alert-success', timeout:3000})

          }else{
            window.scrollTo(0, 0);
            this.spinner = false;
            this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
          }
        },
        // if error 
        (error:any) =>{
          window.scrollTo(0, 0);
          this.spinner = false;
          this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
        })
      }else{
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 5000 });

      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this.spinner = false;
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
    })
  }

// unblock user
  unblockUser(id){
    this._admin.unblockUser(id).subscribe((res:any)=>{
      if(res.success){        
        this._admin.getAllUsers().subscribe((res2:any)=>{
          if (res2.success) {
            window.scrollTo(0, 0);
            this.users = res2.all_users;
            this.spinner = false;
            this._flashMessages.show(res.MSG,{cssClass:'alert-success', timeout:3000})
          }else{
            window.scrollTo(0, 0);
            this.spinner = false;
            this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
          }
        },
        // if error 
        (error:any) =>{
          window.scrollTo(0, 0);
          this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
          this.spinner = false;
        })
      }else{
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this.spinner = false;
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
    })
  }

  ///// to make serch in users
  serchForUser(filter:string){
    this._admin.getAllUsers().subscribe((res:any)=>{
      if (res.success) {
        this.users = res.all_users;
        this.users = this.users.filter(item=>{
          return item.username.toLocaleLowerCase().includes(this.searchUsername)
        })
      }else{
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this.spinner = false;
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 3000 })
    })
  }


}
