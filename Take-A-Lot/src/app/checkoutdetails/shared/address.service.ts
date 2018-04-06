import { Injectable } from '@angular/core';
import { Address } from './address.model';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'


@Injectable()
export class AddressService {
 address : Address
 ad : any;
  constructor(private http: Http,private httpClient : HttpClient) { }


  Postaddress(address : Address){
    var body = JSON.stringify(address);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/Tbladdresse',body,requestOptions).map(x => x.json())
   }


   getAdrress(){
   return this.http.get("http://localhost:49513/api/Tbladdresse?id="+localStorage.getItem("ID"))
  };
   getDelieryAddress(id){
    return this.http.get("http://localhost:49513/api/Tbladdresse?id="+id)
    }

   putAdress(id,adm){
    var body = JSON.stringify(adm);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions})
    return this.http.put("http://localhost:49513/api/Tbladdresse?id="+id,body,requestOptions)
   }
}
