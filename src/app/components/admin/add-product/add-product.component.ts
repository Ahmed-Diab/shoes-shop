import { Component, OnInit, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../../../services/services.service';
import { ValidateService } from '../../../services/validate.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  //Shoes sizess quntty
  dis:string;
  size_41:string;
  size_42:string;
  size_43:string;
  size_44:string;
  size_45:string;
  size_46:string;
  imagesURL:any = [];

  title:string;
  category:string = 'men';
  price:string;
  images:Array<string>;
  selectUpload:any = [];
  // errorMessage:string;
  fileToUpload:File = null;

  uploadPath:string = '';


  constructor(
    private _http: HttpClient,
    private el: ElementRef,
    private _flash_messages:FlashMessagesService,
    private _valdete : ValidateService,
    private _services:ServicesService

  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
   }
//  uplode form data
   upload() {
    var product = {
      dis          : this.dis        ,
      imagesURL    : this.imagesURL  ,
      title        : this.title      ,
      category     : this.category   ,
      price        : this.price      ,
      size_41      : this.size_41    ,
      size_42      : this.size_42    ,
      size_43      : this.size_43    ,
      size_44      : this.size_44    ,
      size_45      : this.size_45    ,
      size_46      : this.size_46    ,
  }
  console.log(product)

  if (!this._valdete.validateAddProduact(product)) {
    window.scrollTo(0, 0);
    this._flash_messages.show('all fildes must be not empty', {cssClass:'alert-danger', timeout:5000})  

  };
// locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#images');
//get the total amount of files attached to the file input.
        var fileCount: number = inputEl.files.length;
//create a new fromdata instance
        let formData = new FormData();
//check if the filecount is greater than zero, to be sure a file was selected.
if (fileCount > 0) { // a file was selected
  for (var i = 0;  i < fileCount; i++) {
    formData.append("images", inputEl.files[i]);
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
}
  this._http.post(`${this._services.url}`, formData).subscribe((res:any) => {
    if (res.success) {
      window.scrollTo(0, 0);
      this._flash_messages.show(res.MSG, {cssClass:'alert-success', timeout:3000})
    }else{
      window.scrollTo(0, 0);
      this._flash_messages.show(res.errMSG, {cssClass:'alert-danger', timeout:5000})              }
  },
  (err)=>{
    window.scrollTo(0, 0),
    this._flash_messages.show(err.message , { cssClass: 'alert-danger', timeout: 20000 });
    console.log(err)
  });
  }
  // to see images when selected
  onChange(file:any){
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
}
