import { Component, OnInit } from '@angular/core';
import { CartService } from '../home-page/shared/cart.service';
import { AddressService } from './shared/address.service';
import { NgForm } from '@angular/forms';
import { Address } from './shared/address.model';
import { OrderItems } from './shared/order-items.model';
import { OrderService } from './shared/order.service';
import { Order } from './shared/order.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PayService } from './shared/pay.service';
import { Payment } from './shared/payment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../products/shared/products.service';
import { Products } from '../products/shared/products.model';

@Component({
  selector: 'app-checkoutdetails',
  templateUrl: './checkoutdetails.component.html',
  styleUrls: ['./checkoutdetails.component.css'],
  providers : [CartService,AddressService,OrderService,PayService,ProductsService]
})
export class CheckoutdetailsComponent implements OnInit {
  adres : any;
  OrderItems : OrderItems;
  Order : Order;
  ord : Order;
  id : number;
  eft : boolean;
  credit : boolean;
  method : string;
  paid : boolean;
  pay : Payment
  meth : Payment;
  newQauantity : number;
  product : Products;
  quantity : number;
 
  constructor(private CartService : CartService, private AddressService : AddressService
    ,private OrderService : OrderService,private toastr:ToastrService,private router : Router
  ,private PayService : PayService,private productServices : ProductsService) { }

  ngOnInit() {
    this.method = "";
    this.paid = false;
    this.eft = false;
    this.credit = false;
    this.CartService.getCartList();
    this.resetForm();

    this.AddressService.getAdrress().subscribe((res : any )=>{
      this.AddressService.address = Object.assign({},res.json());
      
    })
  
    this.OrderService.getOrder().subscribe((res : any )=>{
      this.ord = res.json();
      this.OrderService.order = Object.assign({},this.ord);
      this.id = this.OrderService.order.OrderID;
    });
    
    
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.AddressService.address= {
    customerID : +localStorage.getItem("ID"),
    addressID : 0,
    contactPerson : "",
    phone : "",
    suburb : "",
    zip : "",
    address1 : "",
    address2 : "",
    city :  ""
    
    }
    this.adres =this.AddressService.address;
  }

eftnav()
{
  this.eft = true;
  this.paid = true;
  this.credit = false;
  this.method = "EFT";
  
}
creditnav()
{
  this.eft = false;
  this.credit = true;
  this.method = "Credit/Debit"
  this.paid = true;
  
}

navig()
{
  if(this.eft){
    this.router.navigate(["/eft"]);
  }
    else if(this.credit){
      this.router.navigate(["/payment"]);
      
      
    }

}



  OnSubmit(form : NgForm){
   

    if(this.adres.addressID == 0){
      this.AddressService.Postaddress(form.value)
    .subscribe(data =>{
      
     this.toastr.success('Successfully Added Address','Address')
    });

    }else
    {
        this.AddressService.putAdress(form.value.addressID,form.value)
        .subscribe(data =>{
         
          this.toastr.info('Address Updated Successfully','Address')
        })
    }

  }
  
  caltot() {  
    
    let sum = 0;
    let p = 0;
      for (var i = 0; i < this.CartService.cartlist.length; i++) {
      p= (this.CartService.cartlist[i].price * this.CartService.cartlist[i].quantity);
      sum += p;}
    return sum || 0; 
  } 
proceed()
{
  this.updateProduct();
  this.payMen();
  this.navig();
}


payMen(){

  this.pay ={
    paymentID : 0,
    customerID : +localStorage.getItem("ID"),
    paymentMethod : this.method
    };
 
  this.PayService.getType().subscribe((res : any )=>{
    this.meth = res.json();
    this.pay ={
      paymentID : this.meth.paymentID,
      customerID : +localStorage.getItem("ID"),
      paymentMethod : this.method
      };
    this.PayService.putType(this.meth.paymentID,this.pay)
    .subscribe(data =>{
      console.log(this.method);
    });
  },(err: HttpErrorResponse) => {
      this.PayService.Posttype(this.pay)
      .subscribe(data =>{
      })
    });
}

updateProduct()
{
  for (var i = 0; i < this.CartService.cartlist.length; i++) 
  {
    
    localStorage.setItem("quantity",this.CartService.cartlist[i].quantity+"")
   this.productServices.getbyid(this.CartService.cartlist[i].productID)
   .subscribe((data : any)=>{
     this.product = Object.assign({},data.json());
     this.newQauantity = (this.product.quantity - (+localStorage.getItem("quantity")))
     this.product.quantity = this.newQauantity;
    localStorage.setItem("test",this.product.quantity+"")
     this.productServices.Putproduct(this.product.productID,this.product)
     .subscribe((a : any)=>{});
   })
   
  }
}

   
 }
 
 

  


