import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { OrderItems } from '../checkoutdetails/shared/order-items.model';
import { Order } from '../checkoutdetails/shared/order.model';
import { CartService } from '../home-page/shared/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers : [CartService,OrderService]
})
export class ConfirmationComponent implements OnInit {
 total : string;
 OrderItems : OrderItems;
 Order : Order;
 delivery : any;
 ord : Order;
 dd : number;
 mm : number; 
 yyyy : number;
 deliveryDay : string;
 day : string
 dd1 : number;
 mm1 : number; 
 yyyy1 : number;
 id : number;

  constructor(private CartService : CartService,private OrderService : OrderService,
  private toastr : ToastrService) { }

  ngOnInit() {
    this.total = localStorage.getItem("total")
    this.CartService.getCartList();
    var today = new Date();
    var DDAy = new Date();
    DDAy.setDate(DDAy.getDate() + 10);
    this.dd = today.getDate();
    this.mm = today.getMonth()+1; //January is 0!
    this.yyyy = today.getFullYear();
    this.dd1 = DDAy.getDate();
    this.mm1 = DDAy.getMonth()+1; //January is 0!
    this.yyyy1 = DDAy.getFullYear();

    this.OrderService.getOrder().subscribe((res : any )=>{
      this.ord = res.json();
      this.OrderService.order = Object.assign({},this.ord);
      this.id = this.OrderService.order.OrderID;
    });


this.day = this.mm + '/' + this.dd + '/' + this.yyyy;
this.deliveryDay = this.mm1 + '/' + this.dd1 +'/' + this.yyyy1;

  }


  ondelete()
{
  this.orderItems()
  for (var i = 0; i < this.CartService.cartlist.length; i++) 
  {
    this.OrderService.deleteCart(this.CartService.cartlist[i].cartID)
  .subscribe(x =>{});
}
 this.toastr.info('Purchase successfuly completed','Purchase');
}


orderItems(){
  for (var i = 0; i < this.CartService.cartlist.length; i++) 
  {
    this.OrderItems ={
      itemlist : 0,
      OrderID : this.id,
      productID : this.CartService.cartlist[i].productID,
      quantity : this.CartService.cartlist[i].quantity
      };
    this.OrderService.PostItems(this.OrderItems)
    .subscribe(data =>{
      });
  }
}




}
