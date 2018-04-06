import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { AddressService } from '../checkoutdetails/shared/address.service';
import { Address } from '../checkoutdetails/shared/address.model';
import { EmployeesService } from '../shared/employees.service';

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

}
