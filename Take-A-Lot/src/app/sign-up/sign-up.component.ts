import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import {SignupService} from './shared/sign-up.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers : [SignupService]
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService: SignupService,private toastr : ToastrService,private router : Router) { }

  ngOnInit() {
  
    this.resetForm()
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.signUpService.customer= {
    customerID : null,
    email : "",
    firstName : "",
    lastName : "",
    password : "",
    phone :  ""
    
    }
  }
  OnSubmit(form : NgForm){
      this.signUpService.Postcustomer(form.value)
        .subscribe(data =>{
      
      this.toastr.success('Successfully registered','Register');

      this.signUpService.userAuthentication(form.value.email, form.value.password).subscribe((data: any) => {
        localStorage.setItem('token', data.access_token);
       
        this.signUpService.logged = true;
        this.toastr.success('login successful','login');
            localStorage.removeItem("role");
            this.router.navigate(['/home-page']);
            window.location.reload(true);
      })
      this.resetForm(form);
    })
    
  }

}
