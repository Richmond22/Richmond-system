import { Injectable } from '@angular/core';
import { Employees } from './employees.model';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Injectable()
export class EmployeesService {
  employee : Employees;
  adminlist : Employees[];
  driverlist : Employees[];
  supplierlist : Employees[];
  constructor( private http: Http,private httpClient : HttpClient) { }
  
//========================================================================================Admin

  Postadmin(admin : Employees){
    var body = JSON.stringify(admin);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Admin',body,requestOptions).map(x => x.json())
   }
   Putadmin(id,adm){
     var body = JSON.stringify(adm);
     var headerOptions = new Headers({'Content-type' : 'application/json'});
     var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
     return this.http.put("http://localhost:49513/api/Admin?id="+id,body,requestOptions)
    }

    getAdminList(){
      this.http.get("http://localhost:49513/api/Admin")
      .map((data : Response)=>{
        return data.json() as Employees[];
      }).toPromise().then(x => {
        this.adminlist = x;
      })
      
     }

     deleteAdmin(id){
      return this.http.delete("http://localhost:49513/api/Admin?id="+id).map(res => res.json());
    }

    //============================================================================driver
    Postdriver(admin : Employees){
      var body = JSON.stringify(admin);
      var headerOptions = new Headers({'Content-type' : 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
      return this.http.post('http://localhost:49513/api/driver',body,requestOptions).map(x => x.json())
     }
     Putdriver(id,adm){
       var body = JSON.stringify(adm);
       var headerOptions = new Headers({'Content-type' : 'application/json'});
       var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
       return this.http.put("http://localhost:49513/api/driver?id="+id,body,requestOptions)
      }
  
      getdriverList(){
        this.http.get("http://localhost:49513/api/driver")
        .map((data : Response)=>{
          return data.json() as Employees[];
        }).toPromise().then(x => {
          this.driverlist = x;
        })
        
       }
  
       deletedriver(id){
        return this.http.delete("http://localhost:49513/api/driver?id="+id).map(res => res.json());
      }
 //===========================================================================================supplier
 Postsupplier(admin : Employees){
  var body = JSON.stringify(admin);
  var headerOptions = new Headers({'Content-type' : 'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
  return this.http.post('http://localhost:49513/api/supplier',body,requestOptions).map(x => x.json())
 }
 Putsupplier(id,adm){
   var body = JSON.stringify(adm);
   var headerOptions = new Headers({'Content-type' : 'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
   return this.http.put("http://localhost:49513/api/supplier?id="+id,body,requestOptions)
  }

  getsupplierList(){
    this.http.get("http://localhost:49513/api/supplier")
    .map((data : Response)=>{
      return data.json() as Employees[];
    }).toPromise().then(x => {
      this.supplierlist = x;
    })
    
   }
   getSupplierbyid(id){
    return this.http.get("http://localhost:49513/api/supplier?id="+id)
    
  }
   getadmin(){
    return this.httpClient.get("http://localhost:49513/api/Getadmin", 
    {headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')})});
    
   }
   getsupplier(){
    return this.httpClient.get("http://localhost:49513/api/Getsupplier", 
    {headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')})});
    
   }
   getdriver(){
    return this.httpClient.get("http://localhost:49513/api/Getdriver", 
    {headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')})});
    
   }
   getDrivererbyid(id){
    return this.http.get("http://localhost:49513/api/driver?id="+id)
    
  }

   deletedsuplier(id){
    return this.http.delete("http://localhost:49513/api/supplier?id="+id).map(res => res.json());
  }
}

