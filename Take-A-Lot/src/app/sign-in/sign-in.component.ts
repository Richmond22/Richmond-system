import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {SignupService} from '../sign-up/shared/sign-up.service'

import { ToastrService } from 'ngx-toastr'
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers : [SignupService]
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  isLogin : boolean = false;
  try : boolean;
  check : string;
  
  constructor(private signUpService: SignupService,private router : Router
    ,private toastr:ToastrService) { }

  ngOnInit() {
   
    
  }

  OnSubmit(Email, Password) {
    console.log(Email.substr(-22));
    this.signUpService.userAuthentication(Email, Password).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
     
      this.isLogin= true;
      this.signUpService.logged = true;
    
        if(('@admin.com')===Email.substr(-10)){
        this.router.navigate(['/admin-page']);
        localStorage.setItem("role","emp");
        localStorage.setItem("Auth","admin");
        
        }else if(('.driver@takealot.com')===Email.substr(-20)){
          this.router.navigate(['/driver-page']);
          localStorage.setItem("role","emp");
          localStorage.setItem("Auth","driver");
         
        }else if(('.supplier@takealot.com')===Email.substr(-22)){
          this.router.navigate(['/supplier-page']);
          localStorage.setItem("role","emp");
          localStorage.setItem("Auth","supplier");
          
        }
        else{
          localStorage.removeItem("role");
          this.router.navigate(['/home-page']);
          localStorage.setItem("Auth","customer");
          
          
        }
        window.location.reload(true);
    },
    
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.signUpService.logged = false;
      });
  }

}
