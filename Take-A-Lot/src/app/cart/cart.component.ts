import { Component, OnInit } from '@angular/core';
import { CartService } from '../home-page/shared/cart.service';
import { Cart } from '../home-page/shared/cart.model';
import { ProductsService } from '../products/shared/products.service';
import { SignupService } from '../sign-up/shared/sign-up.service';
import { Cartdetails } from '../home-page/shared/cartdetails.model';
import { OrderItems } from '../checkoutdetails/shared/order-items.model';
import { Order } from '../checkoutdetails/shared/order.model';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../products/shared/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers : [CartService,ProductsService,ToastrService]
})
export class CartComponent implements OnInit {

  total : number;
  items : number;
  updated : boolean;
  product : Products;
  available : boolean;
  asked : number;
  quant : number;
  //product : ProductsService;
  c : object;
  customerdetails : any;
  

  constructor(private CartService : CartService,private ProductService: ProductsService,
  private signupService : SignupService,
  private router : Router,private toastr:ToastrService) { }

  ngOnInit() {

   this.available = true;
    this.ProductService.getProductList()
    this.updated = false;
    this.signupService.getCustomerClaims().subscribe((res : any )=>{
      this.customerdetails = res;
      })
      this.CartService.getCartList();
     this.items += this.CartService.cartdetails.quantity;
    
     
  }
 //update selected item from the list
Selected( cart : Cartdetails) {
  this.asked = parseInt
  ((document.getElementById("Quantity") as HTMLInputElement).value);
  //this.asked = event.target.value,
    this.ProductService.getbyid(cart.productID).subscribe((data : any)=>{
      this.product = data.json();
      if(this.product.quantity >= this.asked)
      {
        this.available = true
        this.quant = this.asked
      }
      else
      {
        this.quant = this.product.quantity;
          this.available = false;
      }
      this.c ={
        cartID : cart.cartID,
        customerID : cart.customerID,
        quantity : this.quant,
        productID : cart.productID
        };

       
    this.CartService.Putcart(cart.cartID,this.c).subscribe(data =>{  
      this.updated = true;
      this.CartService.getCartList();
      
    });
    })
     
    
}


  //calculate the total price of items
  caltot() {  
  let sum = 0;
  let p = 0;
    for (var i = 0; i < this.CartService.cartlist.length; i++) {
     p= (this.CartService.cartlist[i].price * this.CartService.cartlist[i].quantity);
      sum += p;}
  localStorage.setItem("total",sum.toString());
  return sum || 0; 
}  

//calculate the total number of items
calcitems() {  
    
  let tot = 0;
  
    for (var i = 0; i < this.CartService.cartlist.length; i++) {
        tot += this.CartService.cartlist[i].quantity;
      }
 
  return tot || 0; 
} 
//remove item from cart
onDelete(id: number){
  this.CartService.deleteitem(id)
  .subscribe(x =>{
    this.CartService.getCartList();
    this.updated = true;
  }
  );
} 

//navigate to checkout page
navig()
{
  if(this.CartService.cartlist.length > 0){
    this.router.navigate(["/checkoutdetails"]);
  }
    else{
      this.toastr.info('Your Cart is empty please add items','Cart');
      
    }

}

}
