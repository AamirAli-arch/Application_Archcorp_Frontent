import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormGroupDirective,NgForm, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { RegisterUserRequest, RegisterUserResponse } from '../services/employee';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


export class AddEmployeeComponent implements OnInit {


  regitserUserRequest:RegisterUserRequest;





  titleSelected : string

  title =[
    {id: '1', name: 'Mr.'},
    {id: '2', name: 'Ms.'},
    {id: '3', name: 'Mrs.'},    
  ]


  employeeForm = new FormGroup({
    title: new FormControl("", Validators.required),
    //emailFormControl : new FormControl('', [Validators.required, Validators.email])

  });

  constructor(private _employeeService: EmployeesService,
    private _messageNotification: MessageNotifierService,
    private _loaderService: LoaderSpinerService,) { }

  ngOnInit(): void {
  }


  saveEmployee(){
    console.log(this.employeeForm.value)
    if(this.employeeForm.valid){
      let request = new RegisterUserRequest();      
      request.title= this.employeeForm.controls["titleFormControl"].value;     
      //request.email= this.employeeForm.controls["emailFormControl"].value;        
      
      
      this._loaderService.show();
      this._employeeService.register(request).subscribe(
        (response) => {
            if (response.errorMessage == null) {
                this._loaderService.hide();
                
                this._messageNotification.successMessage(
                    response.successMessage     
                                   
                );
                this.employeeForm.reset();
                
                this.employeeForm.get('titleFormControl').clearValidators();
                this.employeeForm.get('titleFormControl').updateValueAndValidity();

                this.employeeForm.get('emailFormControl').clearValidators();
                this.employeeForm.get('emailFormControl').updateValueAndValidity();


            }
            
        },
        (error) => {
            this._loaderService.hide();
            this._messageNotification.errorMessage(
                error.error.errorMessage
            );
        }
      );
    }
  }



}
