import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/temp/navbar/navbar.component';
import { FooterComponent } from './components/temp/footer/footer.component';
import { ErrorComponent } from './components/temp/error/error.component';
import { SpinnerComponent } from './components/temp/spinner/spinner.component';
import { ScrollTopComponent } from './components/temp/scroll-top/scroll-top.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ServicesService } from './services/services.service';
import { FlashMessagesModule, FlashMessagesService } from '../../node_modules/angular2-flash-messages';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { UsersComponent } from './components/admin/users/users.component';
import { MessegesComponent } from './components/admin/messeges/messeges.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    SpinnerComponent,
    ScrollTopComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AddProductComponent,
    EditProductComponent,
    AdminPageComponent,
    UsersComponent,
    MessegesComponent,
    ProductInfoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FlashMessagesModule
  ],
  providers: [ServicesService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
