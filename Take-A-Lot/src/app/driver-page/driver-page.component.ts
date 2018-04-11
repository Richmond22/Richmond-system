import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { AddressService } from '../checkoutdetails/shared/address.service';
import { Address } from '../checkoutdetails/shared/address.model';
import { EmployeesService } from '../shared/employees.service';
import { Order } from '../checkoutdetails/shared/order.model';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css'],
  providers : [OrderService,AddressService,EmployeesService]
})
export class DriverPageComponent implements OnInit {
 add : Address;
 name : any
 login : boolean;
 delivered : boolean;
  constructor(private OrderService : OrderService,private AddressServices : AddressService,
  private EmployeeServices : EmployeesService) { }

  ngOnInit() {
    this.OrderService.getOrderList();
    this.EmployeeServices.getadmin().subscribe((res : any )=>{
      this.name = res.firstname;
      localStorage.setItem("name",this.name);
      
    });

    if(localStorage.getItem("token") != null)
    {
      this.login = true;
    }else
    {
      this.login = false;
    }
  }
  Address(id){
    this.AddressServices.getDelieryAddress(id)
    .subscribe((res : any)=>
    this.add = res.json()
    )
    console.log(id)
  }
  printA(){
    window.print();
  }
  updateStatus(order : Order)
  {
    order.DeliveryStatus = "Delivered"
    this.OrderService.PutOrder(order.OrderID,order).subscribe(x =>{
      this.OrderService.getOrderList();
    })
  }
  stats(order : Order){
    if(order.DeliveryStatus == "Delivered")
    {
        this.delivered = true
    }else{
      this.delivered = false
    }
      return this.delivered;
  }

}
