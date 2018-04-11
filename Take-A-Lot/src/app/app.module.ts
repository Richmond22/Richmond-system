import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { SignupService } from './sign-up/shared/sign-up.service';
import { HttpModule } from '@angular/http';

import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule,Routes} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DriverComponent } from './driver/driver.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductsComponent } from './products/products.component';
import { Customer } from './sign-up/shared/customer.model';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import {ToastrModule} from 'ngx-toastr'
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminComponent } from './admin/admin.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';

import { FusionChartsModule } from 'angular2-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

import { ChartsModule } from 'ng4-charts/ng4-charts';
import { CheckoutdetailsComponent } from './checkoutdetails/checkoutdetails.component';
import { EftComponent } from './eft/eft.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { JsonpModule } from '@angular/http';
import { OrdersComponent } from './orders/orders.component';
import { InvoiceComponent } from './invoice/invoice.component';







@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignUpComponent,
    NavbarComponent,
    SignInComponent,
    AdminPageComponent,
    DriverComponent,
    SupplierComponent,
    ProductsComponent,
    PersonalDetailsComponent,
    CartComponent,
    AddressComponent,
    PaymentComponent,
    AdminComponent,
    DriverPageComponent,
    SupplierPageComponent,
    CheckoutdetailsComponent,
    EftComponent,
    ConfirmationComponent,
    OrdersComponent,
    InvoiceComponent
    
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent},
      {path: 'home-page', component: HomePageComponent},
      {path: 'admin-page', component: AdminPageComponent,canActivate:[AuthGuard]},
      {path: 'products', component: ProductsComponent,canActivate:[AuthGuard]},
      {path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
      {path: 'admin', component: AdminComponent,canActivate:[AuthGuard]},
      {path: 'driver', component: DriverComponent,canActivate:[AuthGuard]},
      {path: 'supplier', component: SupplierComponent,canActivate:[AuthGuard]},
      {path: 'address', component: AddressComponent,canActivate:[AuthGuard]},
      {path: 'payment', component: PaymentComponent,canActivate:[AuthGuard]},
      {path: 'driver-page', component: DriverPageComponent,canActivate:[AuthGuard]},
      {path: 'supplier-page', component: SupplierPageComponent,canActivate:[AuthGuard]},
      {path: 'personal-details',component: PersonalDetailsComponent,canActivate:[AuthGuard]},
      {path: 'checkoutdetails',component: CheckoutdetailsComponent,canActivate:[AuthGuard]},
      {path: 'eft',component: EftComponent,canActivate:[AuthGuard]},
      {path: 'confirmation',component: ConfirmationComponent,canActivate:[AuthGuard]},
      {path: 'orders',component: OrdersComponent,canActivate:[AuthGuard]},
      {path: 'invoice',component: InvoiceComponent,canActivate:[AuthGuard]}
      

    ])
  ],
  providers: [SignupService,Customer,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
