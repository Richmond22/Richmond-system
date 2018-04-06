import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../shared/employees.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employees } from '../shared/employees.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers : [EmployeesService,ToastrService]
})
export class AdminComponent implements OnInit {

  constructor(private EmployeeService: EmployeesService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.EmployeeService.getAdminList();
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
      this.EmployeeService.Postadmin(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.EmployeeService.getAdminList();
      this.toastr.success('Successfully registered','Register')});

    }else
    {
        this.EmployeeService.Putadmin(form.value.ID,form.value)
        .subscribe(data =>{
          this.resetForm(form);
          this.EmployeeService.getAdminList();
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
      this.EmployeeService.deleteAdmin(id)
      .subscribe(x => {
        this.EmployeeService.getAdminList();
        this.toastr.warning('Deleted Successfully','Employee Register')
      })

    }
    
  }
  
}
