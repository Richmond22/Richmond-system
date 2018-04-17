import { Injectable, ErrorHandler } from '@angular/core';
import {Customer} from './customer.model';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';


@Injectable()
export class SignupService {
  readonly rootUrl = "http://localhost:49513/"
  customer : Customer;
  router : Router
  logged : boolean;
  
  
  constructor( private http: Http,private httpClient : HttpClient) { }

  Postcustomer(customer : Customer){//Register customer
   var body = JSON.stringify(customer);
   var headerOptions = new Headers({'Content-type' : 'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
   return this.http.post('http://localhost:49513/api/Tblcustomer',body,requestOptions).map(x => x.json())
  }
  Putcustomer(customer : object,id ){ //update user profile
    var body = JSON.stringify(customer);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tblcustomer?id="+id,body,requestOptions)
   }


  userAuthentication(email, password)//get user token for login
  {
    var data = "username=" + email + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.httpClient.post(this.rootUrl + 'token', data, {headers : reqHeader});
  }

 getCustomerClaims() //get customer profile
 {
   return this.httpClient.get(this.rootUrl + 'api/GetUserClaims', 
   {headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')})});
 }

}
