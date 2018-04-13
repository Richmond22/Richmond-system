import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Cart } from './cart.model';
import { ToastrService } from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';
import { Cartdetails } from './cartdetails.model';

@Injectable()
export class CartService {
  cartlist : Cartdetails[];
  cartdetails : Cartdetails;
  selctedcart : Cart;
  constructor(private http : Http) { }

  Postcart(cart : Cart){
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Tblcart',body,requestOptions).map(x => x.json())
   }
   Postcart1(cart : Cart){
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Carts',body,requestOptions).map(x => x.json())
   }
  
  updatecart(cart : Cart,id : number){
  
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tblcart?id="+id,body,requestOptions).map(x => x.json())
   }

   Putcart(id : number,cart : object){
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tblcart?id="+id,body,requestOptions)
   }

   getCartList(){

    this.http.get("http://localhost:49513/api/Tblcart?id="+localStorage.getItem('ID'))
    .map((data : Response)=>{
      return data.json() as Cartdetails[];
    }).toPromise().then(x => {
      this.cartlist = x;
    })
   }
   deleteitem(id: number){
     return this.http.delete("http://localhost:49513/api/Tblcart?id="+id).map(res => res.json());
   }

}
