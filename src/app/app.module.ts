import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule, routingComponant } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/temp/navbar/navbar.component';
import { FooterComponent } from './components/temp/footer/footer.component';
import { SpinnerComponent } from './components/temp/spinner/spinner.component';
import { ScrollTopComponent } from './components/temp/scroll-top/scroll-top.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesService } from './services/services.service';
import { FlashMessagesModule, FlashMessagesService } from '../../node_modules/angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ScrollTopComponent,
    routingComponant,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FlashMessagesModule,
    NgxEditorModule,
    NgxPaginationModule
  ],
  providers: [ServicesService, FlashMessagesService, ValidateService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
