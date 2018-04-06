import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Employees } from '../shared/employees.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers : [EmployeesService,ToastrService]
})
export class DriverComponent implements OnInit {

  constructor(private EmployeeService: EmployeesService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.EmployeeService.getdriverList();
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
      this.EmployeeService.Postdriver(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.EmployeeService.getdriverList();
      this.toastr.success('Successfully registered','Register')});

    }else
    {
        this.EmployeeService.Putdriver(form.value.ID,form.value)
        .subscribe(data =>{
          this.resetForm(form);
          this.EmployeeService.getdriverList();
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
      this.EmployeeService.deletedriver(id)
      .subscribe(x => {
        this.EmployeeService.getdriverList();
        this.toastr.warning('Deleted Successfully','Employee Register')
      })

    }
    
  }

}
