import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PayService } from '../checkoutdetails/shared/pay.service';
import { Payment } from '../checkoutdetails/shared/payment.model';
import { Eft } from '../checkoutdetails/shared/eft.model';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../checkoutdetails/shared/order.model';
import { OrderItems } from '../checkoutdetails/shared/order-items.model';
import { OrderService } from '../checkoutdetails/shared/order.service';

@Component({
  selector: 'app-eft',
  templateUrl: './eft.component.html',
  styleUrls: ['./eft.component.css'],
  providers : [PayService,OrderService]
})
export class EftComponent implements OnInit {
  pr : boolean;
  meth : Payment;
  ef : Eft;
  OrderItems : OrderItems;
  Order : Order;
  delivery : any;
  ord : Order;
  dd : number;
  mm : number; 
  yyyy : number;
  deliveryDay : string;
  day : string
  dd1 : number;
  mm1 : number; 
  yyyy1 : number;

  constructor(private PayService : PayService,private toastr : ToastrService,private OrderService : OrderService) { }

  ngOnInit() {
    this.pr = false;
    this.resetForm();

    this.PayService.getType().subscribe((res : any )=>{
      this.meth = res.json();
      this.PayService.payment  = Object.assign({},this.meth);
      this.PayService.eft.paymentID =  this.meth.paymentID;
      

      this.PayService.getEFT(this.meth.paymentID).subscribe((res : any )=>{
        this.ef = res.json();
        this.PayService.eft  = Object.assign({},this.ef);
        
      });
    });
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.PayService.eft= {
      ID : 0,
      paymentID :0,
      AccHolder : "",
      Bank : "",
      AccNo : "",
      Branch : "" 
    
    }
  }


  OnSubmit(form : NgForm){
   
    this.pr = true;
       if(form.value.ID == 0)
       {
         this.PayService.Posteft(form.value)
       .subscribe(data =>{
         
        this.toastr.success('Payment Successfully completed','Payment');
       });
   
       }else
       {
          this.PayService.putEft(form.value.ID,form.value)
           .subscribe(data =>{
            
            this.toastr.success('Payment Successfully completed','Payment');
           })
       }
   
     }

     //create an order
CreateOrder(){
  var DDAy = new Date();
  DDAy.setDate(DDAy.getDate() + 10);
  var today = new Date();
  var DDAy = new Date();
  DDAy.setDate(DDAy.getDate() + 10);
  this.dd = today.getDate();
  this.mm = today.getMonth()+1; //January is 0!
  this.yyyy = today.getFullYear();
  this.dd1 = DDAy.getDate();
  this.mm1 = DDAy.getMonth()+1; //January is 0!
  this.yyyy1 = DDAy.getFullYear();
  this.day = this.mm + '/' + this.dd + '/' + this.yyyy;
  this.Order ={
      OrderID : 0,
      customerID : +localStorage.getItem("ID"),
      date : this.dd + '/' + this.mm + '/' +  this.yyyy,
      totalCost : +localStorage.getItem("total"),
      deliveryDate : this.deliveryDay = this.dd1 +'/' + this.mm1 + '/' +  this.yyyy1,
      DeliveryStatus : "Not Delivered"
        };
  this.OrderService.PostOrder(this.Order)
  .subscribe(data =>{
    
    }); 
  }
}
