import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Products } from './products.model';


@Injectable()
export class ProductsService {
  readonly rootUrl = "http://localhost:49513"
 
 product : Products;
 productlist : Products[];
 catlist : Products[];
 
  constructor(private http: Http) { }


  Postproduct(product : Products){
    var body = JSON.stringify(product);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Tblproduct',body,requestOptions).map(x => x.json())
   }

   getProductList(){

    this.http.get("http://localhost:49513/api/Tblproduct")
    .map((data : Response)=>{
      return data.json() as Products[];
    }).toPromise().then(x => {
      this.productlist = x;
    })
    
   }

   getbyCategory(cat){

    this.http.get("http://localhost:49513/api/GetbyCategory?category="+cat)
    .map((data : Response)=>{
      return data.json() as Products[];
    }).toPromise().then(x => {
      this.productlist = x;
    })
    
   }

   getProductCart(){

    this.http.get("http://localhost:49513/api/Tblproduct")
    .map((data : Response)=>{
      return data.json() as Products[];
    }).toPromise().then(x => {
      this.productlist = x;
    })
  }
  deleteitem(id: number){
    return this.http.delete("http://localhost:49513/api/Tblproduct?id="+id).map(res => res.json());
  }

  Putproduct(id : number,p : object){
    var body = JSON.stringify(p);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tblproduct?id="+id,body,requestOptions)
   }

   getbyid(id){
    this.http.get("http://localhost:49513/api/Tblproduct?id="+id)
    .map((data : any)=>{
      return data;
    });
    }
   

}
