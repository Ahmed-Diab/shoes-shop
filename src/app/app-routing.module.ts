import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/temp/error/error.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { MessegesComponent } from './components/admin/messeges/messeges.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent, data:{depth:'home'}},
  {path:'cart', component:CartComponent, data:{depth:'cart'}},
  {path:'product_info', component:ProductInfoComponent, data:{depth:'product_info'}},
  {path:'login', component:LoginComponent, data:{depth:'login'}},
  {path:'register', component:RegisterComponent, data:{depth:'register'}},
  {path:'contact', component:ContactComponent, data:{depth:'contact'}},
  {path:'profile', component:ProfileComponent, data:{depth:'profile'}, canActivate:[AuthGuard]},
  {path:'admin/login', component:LoginComponent, data:{depth:'login'}},

  {path:'admin', component:AdminHomeComponent, canActivate:[AdminGuard], children:[
    {path:'', redirectTo:'add', pathMatch:'full'},
    {path:'add', component:AddProductComponent},
    {path:'edit', component:EditProductComponent},
    {path:'users', component:UsersComponent}
  ]},

  
  {path:'**', component:ErrorComponent, data:{depth:'error'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponant = [
  HomeComponent,
  CartComponent,
  ErrorComponent,
  ProductInfoComponent,
  AdminHomeComponent,
  ContactComponent,
  ErrorComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  AddProductComponent,
  EditProductComponent,
  UsersComponent,
  MessegesComponent,

]