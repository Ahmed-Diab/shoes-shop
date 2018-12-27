import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { FlashMessagesService } from '../../../../../node_modules/angular2-flash-messages';
import { ServicesService } from '../../../services/services.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  data: any = [];
  spinner: boolean;
  value:string = '';
  subscription:Subscription;
  imagesURL:any = [];
  title:string;
  category:string = 'men';
  price:string;
  images:Array<string>;
  selectUpload:any = [];
  // errorMessage:string;
  fileToUpload:File = null;
  uploadPath:string = '';
//Shoes sizess quntty
  size_41:string;
  size_42:string;
  size_43:string;
  size_44:string;
  size_45:string;
  size_46:string;
  id:string;
  dis:any;
  url:string;
  constructor(
    private element: ElementRef,
    private _http: HttpClient,
    private _flashMessages:FlashMessagesService,
    private _valdete : ValidateService,
    private _services:ServicesService
  ) { }

  ngOnInit() {
    this.url =  this._services.url;
    this.subscription = this._services.getShoes().subscribe((res:any)=>{
      if (res.success) {
        this.data = res.data;
        this.spinner = false;
      }
      if(!res.success){
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    }, 
    (error:any) =>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 20000 }),
      this.spinner = false
    });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
// remove product
remove(e, product){
  let id = product._id;
      return this._http.get(`/product/${id}/remove`).subscribe((res:any)=>{
        if(res.success){
          setTimeout(()=>{e.target.parentElement.remove()}, 500);
          e.target.parentElement.classList.add('displayNone');
        }
      })
}// en remove

// to see images when selected
onChange(file:any){
  this.imagesURL = []

  for (var i = 0; i < file.length; i++) {
    // this.selectUpload.push(file[i].name);
    var fi = file[i];
    var imageReader = new FileReader();
    imageReader.onload = (event:any)=>{
      this.imagesURL.push(event.target.result);
      }
    imageReader.readAsDataURL(fi);
    }
  }
editProduct($event, product){
  var overlay = document.querySelector('.overlay');
  document.body.style.overflow = 'hidden';
  overlay.classList.add('displayOverlay');
  this.dis       = product.dis
  this.title     = product.title;
  this.category  = product.category;
  this.price     = product.price;
  this.size_41   = product.size_41;
  this.size_42   = product.size_42;
  this.size_43   = product.size_43;
  this.size_44   = product.size_44;
  this.size_45   = product.size_45;
  this.size_46   = product.size_46;
  this.id        = product._id;
  this.images    = product.images;
}

uploadProduct(){
  var product = {
    title        : this.title      ,
    category     : this.category   ,
    price        : this.price      ,
    size_41      : this.size_41    ,
    size_42      : this.size_42    ,
    size_43      : this.size_43    ,
    size_44      : this.size_44    ,
    size_45      : this.size_45    ,
    size_46      : this.size_46    ,
    dis          : this.dis
}
if(product.title === undefined || product.category === undefined || product.price === undefined||product.size_41 === undefined || product.size_42 === undefined || product.size_43 === undefined || product.size_44 === undefined || product.size_45 === undefined || product.size_46 === undefined) {
  window.scrollTo(0, 0);
  this._flashMessages.show('all fildes must be not empty', {cssClass:'alert-danger', timeout:5000});
};
// locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.element.nativeElement.querySelector('#images');
//get the total amount of files attached to the file input.
      var fileCount: number = inputEl.files.length;
//create a new fromdata instance
      let formData = new FormData();
      if(fileCount > 4){
        window.scrollTo(0, 0);
        this._flashMessages.show('images must be just for not more not less', {cssClass:'alert-danger', timeout:2000})  
        this.imagesURL = undefined
      }
      if(fileCount < 4 && fileCount > 1){
        window.scrollTo(0, 0);
        this._flashMessages.show('images must be just for not more not less', {cssClass:'alert-danger', timeout:5000})  
        this.imagesURL = undefined
    
      }
//check if the filecount is greater than zero, to be sure a file was selected.
if (fileCount == 4) { // a file was selected
for (var i = 0;  i < fileCount; i++) {
  formData.append("images", inputEl.files[i]);
  }
}
formData.append('title',       this.title);
formData.append('dis',         this.dis);
formData.append('category',    this.category);
formData.append('price',       this.price);
formData.append('size_41',     this.size_41);
formData.append('size_42',     this.size_42);
formData.append('size_43',     this.size_43);
formData.append('size_44',     this.size_44);
formData.append('size_45',     this.size_45);
formData.append('size_46',     this.size_46);
// }
this._http.post(`/product/${this.id}/edit`, formData).subscribe((res:any) => {
  if (res.success) {
    this._services.getShoes().subscribe((res:any)=>{
      if (res.success) {
        this.data = res.data;
        this.spinner = false;
      }
      if(!res.success){
        window.scrollTo(0, 0);
        this._flashMessages.show(res.errMSG , { cssClass: 'alert-danger', timeout: 20000 });
      }
    },
    // if error 
    (error:any) =>{
      window.scrollTo(0, 0);
      this._flashMessages.show(error.message , { cssClass: 'alert-danger', timeout: 20000 }),
      this.spinner = false
    });
    var overlay = document.querySelector('.overlay');
    overlay.classList.remove('displayOverlay');
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    this._flashMessages.show(res.MSG, {cssClass:'alert-success', timeout:3000})
    this.imagesURL = []

  }else{
    window.scrollTo(0, 0);
    this._flashMessages.show(res.errMSG, {cssClass:'alert-danger', timeout:5000})   
    this.imagesURL = []

  }
},
(err)=>{
  window.scrollTo(0, 0),
  this._flashMessages.show(err.message , { cssClass: 'alert-danger', timeout: 20000 });
});
}
}
