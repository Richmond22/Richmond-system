import { Component, OnInit } from '@angular/core';
import {} from '../sign-up/shared/./sign-in.component.ts'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SignupService } from '../sign-up/shared/sign-up.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [SignupService]
})
export class NavbarComponent implements OnInit {
  log : boolean;
  cust : boolean;
  name : string;
 
  constructor(private router: Router,private signUpServices: SignupService) { }

  ngOnInit() {
   
    this.in();
    this.iscus();
    console.log(this.cust)
    this.name = localStorage.getItem("name")
    
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem("role");
    localStorage.removeItem("name")
    localStorage.removeItem("Auth");
    this.signUpServices.logged
    this.in();
    this.iscus();
    
   
  }
  in(){
    if(localStorage.getItem("token") == null )
    {
      this.log = false
    }else{
      this.log = true;
    }
  
  }
  iscus()
    {
      if(localStorage.getItem("role") == null )
    {
      this.cust = false
    }else{
      this.cust = true;
    }
    }



 
}
