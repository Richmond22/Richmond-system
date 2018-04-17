import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions,RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Schedule } from './schedule.model';
import { EmployeesService } from '../shared/employees.service';

@Injectable()
export class ScheduleService {
  schedule : Schedule;
  schedulelist : Schedule[];

  constructor(private http : Http) { }
    

  PostSchedule(schedule : Schedule){//post supply schedule
    var body = JSON.stringify(schedule);
    var headerOptions = new Headers({'Content-type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:49513/api/TblSchedule',body,requestOptions).map(x => x.json())
   }
   getSchedule(){//get scheduled supplies
    return this.http.get("http://localhost:49513/api/TblSchedule?id="+localStorage.getItem("ID"))
    }
    Remove(id: number){//remove schedule supply
      return this.http.delete("http://localhost:49513/api/TblSchedule?id="+id).map(res => res.json());
    }
    getScheduleList(){//get scheduled supply list

      this.http.get("http://localhost:49513/api/TblSchedule")
      .map((data : Response)=>{
        return data.json() as Schedule[];
      }).toPromise().then(x => {
        this.schedulelist = x;
      })
     }

     deletedSchedule(id){
      return this.http.delete("http://localhost:49513/api/TblSchedule?id="+id).map(res => res.json());
    }

}
