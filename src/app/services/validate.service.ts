import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.email == undefined || user.username == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateAddProduact(product){
    if(product.dis == undefined || product.title == undefined || product.imagesURL == undefined ||  product.category == undefined || product.sp_category == undefined || product.price == undefined) {
      return false;
  } else {
    return true;
  }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  val
}
