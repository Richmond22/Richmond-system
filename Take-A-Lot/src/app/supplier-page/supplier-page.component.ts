import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
import { ProductsService} from '../products/shared/products.service';
import { ScheduleService } from './schedule.service';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../shared/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.css'],
  providers : [ProductsService,ScheduleService,EmployeesService]
  
})
export class SupplierPageComponent implements OnInit {
   name : any[];
  dat : any[];
  sup : any
  id : number;
  login : boolean;
  stats : string;
  updated : boolean = false;
  

  constructor(private ProductService : ProductsService,private ScheduleService : ScheduleService,
  private EmployeesServices : EmployeesService,private toastr : ToastrService ) { 

  
  }

 

  ngOnInit() {
    this.updated = false;
    this.resetForm()
   
      
    this.EmployeesServices.getsupplier().subscribe((res : any )=>{
      this.sup = res;
      this.id = this.sup.ID;
      this.EmployeesServices.getSupplierbyid(this.id)
      .subscribe(x=>{
        this.EmployeesServices.employee = Object.assign({},x.json());
      })
      this.ScheduleService.schedule.ID = this.id;
      localStorage.setItem("name",res.firstname)
    });
 
    if(localStorage.getItem("token") != null)
    {
      this.login = true;
    }else
    {
      this.login = false;
    }

    this.ProductService.getProductList();
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.ScheduleService.schedule= {
    scheduleID  : 0,
    ID : this.id,
    Sname : "",
    Cname : "",
    contacts : "",
    discription : "",
    quantity : null,
    date :  ""
    
    }
  }
 

  listby(event){
    this.ProductService.getbyCategory(event.target.value);
  }
  OnSubmit(form : NgForm)
  {
    this.ScheduleService.PostSchedule(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.toastr.success('Successfully Scheduled supply','Schedule');
    })

  }
  OnSubmitprofile(form : NgForm)
  {
        this.EmployeesServices.Putsupplier(form.value.ID,form.value)
        .subscribe(data =>{
          this.EmployeesServices.getsupplierList();
          this.updated = true;
        })
    
    
  }
  status(quantity : number){
  
    if(quantity >= 20)
    {
      this.stats  = "Product enough in store";
      
    }else
    {
      this.stats = "Product running out"
      
    }
    return this.stats

  }

  


 }
 
  


