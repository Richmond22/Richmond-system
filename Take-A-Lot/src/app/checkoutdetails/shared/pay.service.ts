import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Payment } from './payment.model';
import { Eft } from './eft.model';
import { Credit } from './credit.model';
import {Jsonp} from '@angular/http';

@Injectable()
export class PayService {
  eft : Eft;
  payment : Payment;
  credit : Credit;

  constructor(private http : Http,private _jsonp: Jsonp) { }


  Posttype(method : Payment){
    var body = JSON.stringify(method);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/payment',body,requestOptions).map(x => x.json())
   }
   Posteft(details : Eft){
    var body = JSON.stringify(details);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/eft',body,requestOptions).map(x => x.json())
   }
   Postcredit(details : Credit){
    var body = JSON.stringify(details);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Tblcredit',body,requestOptions).map(x => x.json())
   }

   putType(id,payment){
    var body = JSON.stringify(payment);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/payment?id="+id,body,requestOptions)
   }
   putEft(id,eft){
    var body = JSON.stringify(eft);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/eft?id="+id,body,requestOptions)
   }
   putCredit(id,credit){
    var body = JSON.stringify(credit);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tblcredit?id="+id,body,requestOptions)
   }

   getType(){
    return this.http.get("http://localhost:49513/api/payment?id="+localStorage.getItem("ID"))
    }

  getEFT(id){
      return this.http.get("http://localhost:49513/api/eft?id="+id)
      }

  getCredit(id){
        return this.http.get("http://localhost:49513/api/Tblcredit?id="+id)
      }

}
