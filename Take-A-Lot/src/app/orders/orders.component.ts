import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { Orderdetails } from '../checkoutdetails/shared/orderdetails.model';
import { Order } from '../checkoutdetails/shared/order.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers : [OrderService]
})
export class OrdersComponent implements OnInit {
  deliverd : boolean;
 
  constructor(private OrderService : OrderService) { }

  ngOnInit() {
    this.OrderService.getOrderList();
  
  }

  items(order : Order){
    this.OrderService.getDetails(order.OrderID);

  }
  deleteOrder(id){
    this.OrderService.deleteOrder(id).subscribe((res : any)=>{
      this.OrderService.getOrderList();
    });
    
  }
  status(order: Order){
    if(order.DeliveryStatus == "Delivered")
    {
      this.deliverd = true;
    }
    else{
      this.deliverd = false;
    }
    return this.deliverd;
  }
 
}
