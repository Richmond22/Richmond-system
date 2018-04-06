import { Component, OnInit } from '@angular/core';
import { Employees } from '../shared/employees.model';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../shared/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers : [EmployeesService,ToastrService]
})
export class SupplierComponent implements OnInit {

  constructor(private EmployeeService: EmployeesService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.EmployeeService.getsupplierList();
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
    form.reset();
    this.EmployeeService.employee= {
    ID : 0,
    firstname : "",
    lastname : "",
    email : "",
    password : "",
    phone :  ""
    }
  }

  OnSubmit(form : NgForm)
  {
    if(form.value.ID == 0){
      this.EmployeeService.Postsupplier(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.EmployeeService.getsupplierList();
      this.toastr.success('Successfully registered','Register')});

    }else
    {
        this.EmployeeService.Putsupplier(form.value.ID,form.value)
        .subscribe(data =>{
          this.resetForm(form);
          this.EmployeeService.getsupplierList();
          this.toastr.info('Recorded Updated Successfully','Employee Register')
        })
    }
    
  }
  showforEdit(ad : Employees)
  {
    this.EmployeeService.employee = Object.assign({},ad);

  }

  onDelete(id : number)
  {
    if(confirm('Are you sure to delete this record ?')== true)
    {
      this.EmployeeService.deletedsuplier(id)
      .subscribe(x => {
        this.EmployeeService.getsupplierList();
        this.toastr.warning('Deleted Successfully','Employee Register')
      })

    }
    
  }

}
