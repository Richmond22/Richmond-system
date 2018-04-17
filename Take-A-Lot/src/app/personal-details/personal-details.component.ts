import { Component, OnInit } from '@angular/core';
import { SignupService } from '../sign-up/shared/sign-up.service';
import { NgForm } from '@angular/forms';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {ToastrService} from  'ngx-toastr'

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  newCust : object = {};
  customerdetails : any;
  constructor(private signUpService: SignupService,private toastr : ToastrService) { }

  ngOnInit() {
    this.signUpService.getCustomerClaims().subscribe((res : any )=>{
      this.customerdetails = res;
      
    })

   
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.signUpService.customer= {
    customerID : 0,
    email : "",
    firstName : "",
    lastName : "",
    password : "",
    phone :  ""
    }
  }
  OnSubmit(form : NgForm){ //update personal details
    
    this.signUpService.Putcustomer(form.value,form.value.customerID)
    .subscribe(data =>{  
    });
    this.toastr.success('Profile updated successful','profile update');
  }
}
