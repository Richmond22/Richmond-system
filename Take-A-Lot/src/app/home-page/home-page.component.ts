import { Component, OnInit } from '@angular/core';
import { SignupService } from '../sign-up/shared/sign-up.service';
import { Customer } from '../sign-up/shared/customer.model';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import { Router } from '@angular/router';
import { ProductsService } from '../products/shared/products.service';
import { Products } from '../products/shared/products.model';
import { CartService } from './shared/cart.service';
import { Cart } from './shared/cart.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers : [ProductsService,CartService]
})
export class HomePageComponent implements OnInit {
  customerdetails : any;
  product : Products;
  cart : Cart;
  login : boolean;
  
  constructor( private signupService : SignupService,private router : Router
  ,private ProductService : ProductsService,private cartService : CartService
,private toastr : ToastrService) {}

  ngOnInit() {
    
    this.ProductService.getProductList();
    if(localStorage.getItem("token")!=null){
    this.signupService.getCustomerClaims().subscribe((res : any )=>{
    this.customerdetails = res;
    localStorage.setItem('ID',res.customerID);
    localStorage.setItem("name",this.customerdetails.firstname)
    })}
    
    if(localStorage.getItem("token") != null)
    {
      this.login = true;
    }else
    {
      this.login = false;
    }
   
   
  }

  searchby(event){
    if(event.target.value == "all"){
      this.ProductService.getProductList();
    }else
    {
      this.ProductService.getbyCategory(event.target.value);
    }
    
  }


  addtocart(product : Products){
    if(localStorage.getItem("token")!= null){
      this.cart ={
            cartID : 0,
            productID : product.productID,
            customerID : this.customerdetails.customerID,
            quantity : 1,
            };
    
      this.cartService.Postcart(this.cart)
      .subscribe(data =>{
        this.toastr.info('Successfully added to Cart','Cart list')
        });
    }else{
      this.toastr.warning('Please login','Cart');
      console.log("test")
    }
  }

}
