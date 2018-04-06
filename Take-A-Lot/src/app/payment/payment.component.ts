import { Component, OnInit } from '@angular/core';
import { PayService } from '../checkoutdetails/shared/pay.service';
import { Payment } from '../checkoutdetails/shared/payment.model';
import { NgForm } from '@angular/forms';
import { Credit } from '../checkoutdetails/shared/credit.model';
import { ToastrService } from 'ngx-toastr';
import { OrderItems } from '../checkoutdetails/shared/order-items.model';
import { Order } from '../checkoutdetails/shared/order.model';
import { OrderService } from '../checkoutdetails/shared/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers : [PayService,OrderService]
})
export class PaymentComponent implements OnInit {
  meth : Payment;
  cred : Credit;
  pr : boolean;
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
      this.PayService.credit.paymentID =  this.meth.paymentID;
      

      this.PayService.getCredit(this.meth.paymentID).subscribe((res : any )=>{
        this.cred = res.json();
        this.PayService.credit  = Object.assign({},this.cred);
        
      });
    });
   
    //this.PayService.credit

  }

  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.PayService.credit= {
      ID : 0,
      paymentID :0,
      CardDescription : "",
      NameonCard  : "",
      CardNumber : "",
      ExpirationDate : "",
      Type : "",
      Cvv : ""
    
    }
  }

  OnSubmit(form : NgForm){
   
 this.pr = true;
    if(form.value.ID == 0)
    {
      this.PayService.Postcredit(form.value)
    .subscribe(data =>{
      
     this.toastr.success('Payment Successfully completed','Payment')
    });

    }else
    {
       this.PayService.putCredit(form.value.ID,form.value)
        .subscribe(data =>{
         
          this.toastr.success('Payment Successfully completed','Payment')
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
  this.mm = today.getMonth()+1; 
  this.yyyy = today.getFullYear();
  this.dd1 = DDAy.getDate();
  this.mm1 = DDAy.getMonth()+1; 
  this.yyyy1 = DDAy.getFullYear();
  this.day = this.mm + '/' + this.dd + '/' + this.yyyy;
  this.Order ={
      OrderID : 0,
      customerID : +localStorage.getItem("ID"),
      date : this.dd + '/' + this.mm + '/' +  this.yyyy,
      totalCost : +localStorage.getItem("total"),
      deliveryDate : this.deliveryDay = this.dd1 +'/' + this.mm1 + '/' +  this.yyyy1
        };
  this.OrderService.PostOrder(this.Order)
  .subscribe(data =>{
    
    }); 
  }

}
