import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { Order } from '../checkoutdetails/shared/order.model';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers:[OrderService]
})
export class InvoiceComponent implements OnInit {
  order : Order;

  constructor(private OrderServices : OrderService) { }

  ngOnInit() {
    this.OrderServices.getOrderListbyID();
  }

}
