import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/shared/products.service';
import { OrderService } from '../checkoutdetails/shared/order.service';
import { ScheduleService } from '../supplier-page/schedule.service';
import { EmployeesService } from '../shared/employees.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers : [ProductsService,OrderService,ScheduleService,EmployeesService]
})
export class AdminPageComponent implements OnInit {
 name : any;
 login : boolean;
  constructor(private router: Router,private ProductService : ProductsService,
  private OrderService : OrderService,private ScheduleServices : ScheduleService,
  private EmployeeServices : EmployeesService ) { }

  ngOnInit() {

    this.ScheduleServices.getScheduleList();//Get Scheduled supply details
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
  //Remove supply schedule
  delete(id){
    this.ScheduleServices.deletedSchedule(id).subscribe((data : any)=>{
      this.ScheduleServices.getScheduleList();
  })
  }

}
