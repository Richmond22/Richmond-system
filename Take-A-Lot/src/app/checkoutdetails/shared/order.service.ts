import { Injectable } from '@angular/core';
import { OrderItems } from './order-items.model';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Order } from './order.model';
import { Orderdetails } from './orderdetails.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class OrderService {
order : Order;
prolist : Orderdetails[];
DetailsList : Subject<Array<Orderdetails>> = new BehaviorSubject<Array<Orderdetails>>([]);
orders : Subject<Array<Order>> = new BehaviorSubject<Array<Order>>([]);
orderList : Order[];
  constructor(private http : Http) { }

  PostItems(items : OrderItems){
    var body = JSON.stringify(items);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/OrderItem',body,requestOptions).map(x => x.json())
   }

   PostOrder(order : Order){
    var body = JSON.stringify(order);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Tblorder',body,requestOptions).map(x => x.json())
   }

   getOrder(){
    return this.http.get("http://localhost:49513/api/Tblorder?id="+localStorage.getItem("ID"))
    }

   getDetails(id){
    this.http.get("http://localhost:49513/api/OrderItem?id="+id)
    .map((data : Response)=>{
      return data.json() as Orderdetails[];
    }).toPromise().then(x => {
      this.prolist = x;
    })
   }
  
 getOrderList(){

  this.http.get("http://localhost:49513/api/Tblorder")
    .map((data : Response)=>{
      return data.json() as Order[];
    }).toPromise().then(x => {
      this.orderList = x;
    })
 }
 getOrderListbyID(){

  this.http.get("http://localhost:49513/api/GetTblorderbyid?id="+localStorage.getItem("ID"))
    .map((data : Response)=>{
      return data.json() as Order[];
    }).toPromise().then(x => {
      this.orderList = x;
    })
 }


   deleteCart(id: number){
    return this.http.delete("http://localhost:49513/api/Tblcart?id="+id).map(res => res.json());
  }
  
  deleteOrder(id: number){
    return this.http.delete("http://localhost:49513/api/Tblorder?id="+id).map(res => res.json());
  }

}
