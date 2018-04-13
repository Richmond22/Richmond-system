import { Component, OnInit } from '@angular/core';
import { ProductsService } from './shared/products.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Products } from './shared/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers : [ProductsService]
})

export class ProductsComponent implements OnInit {
  
  c : any;
  pric : number;
  constructor(private ProductService : ProductsService,private toastr : ToastrService) { }
  
  ngOnInit() {
    this.resetForm();
    this.ProductService.getProductList();
    
  }
 
  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.ProductService.product= {
    productID: 0,
    name : "",
    model : "",
    category : "",
    price : 0,
    quantity : 0,
    imgName : "",
    minQuantity : 0
    }
  }
  OnSubmit(form : NgForm){
    this.ProductService.Postproduct(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.ProductService.getProductList();
      this.toastr.success('product Successfully added','Add product');
    })}


    updateFile(file: HTMLInputElement) {
      let name = file.value.substr(12);
      this.ProductService.product.imgName = name;
    }
    cat(event)
    {
      this.ProductService.product.category = event.target.value;
      console.log(event.target.value)
    }

    Selected(event, pro : Products) {
      console.log(event.target.value)
       this.c ={
          productID : pro.productID,
          name : pro.name,
          quantity : event.target.value,
          price : pro.price,
          model : pro.model,
          imgName : pro.imgName,
          category : pro.category,
        minQuantity : pro.minQuantity};
      this.ProductService.Putproduct(pro.productID,this.c).subscribe(data =>{ 
        this.ProductService.getProductList();
      });
      
  }
  
  update(price:number,pro : Products){
    this.pric = parseFloat
  ((document.getElementById("price") as HTMLInputElement).value);
    this.c ={
      productID : pro.productID,
      name : pro.name,
      quantity : pro.quantity,
      price : this.pric,
      model : pro.model,
      imgName : pro.imgName,
      category : pro.category,
       minQuantity : pro.minQuantity};
    
      console.log(((document.getElementById("price") as HTMLInputElement).value))
  this.ProductService.Putproduct(pro.productID,this.c).subscribe(data =>{  
    this.ProductService.getProductList();
  });

  }

    onDelete(id: number){
      this.ProductService.deleteitem(id)
      .subscribe(x =>{
        this.ProductService.getProductList();
      }
      );
    } 
       
}
