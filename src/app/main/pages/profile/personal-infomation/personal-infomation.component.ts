import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { personalInformation } from '../models/profile';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-personal-infomation',
  templateUrl: './personal-infomation.component.html',
  styleUrls: ['./personal-infomation.component.scss']
})
export class PersonalInfomationComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray =[
        {name:'', value:''}
    ]
    constructor(private fb: FormBuilder,    private _services: ProfileService, private dialogRef: MatDialogRef<PersonalInfomationComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }
  
    ngOnInit(): void {
      this.allocationForm = this.fb.group({
         passportNo: new FormControl(''),
         passportExpiryDate: new FormControl(''),
         nationality: new FormControl(''),
         TelNumber: new FormControl(''),
         religion: new FormControl(''),
         marital_status: new FormControl(1),
         employmentspouse: new FormControl(''),
         children: new FormControl(''),
        })
    }
    InformationUpdate(){
        const request = new personalInformation();
        request.passportNumber= this.allocationForm.controls["passportNo"].value;
        request.mobileNumber=this.allocationForm.controls["passportNo"].value;
        // request.passportNumber=this.allocationForm.controls["passportNo"].value;
        // request.passportNumber=this.allocationForm.controls["passportNo"].value;
        // request.passportNumber=this.allocationForm.controls["passportNo"].value;
        // request.passportNumber=this.allocationForm.controls["passportNo"].value;
        // request.passportNumber=this.allocationForm.controls["passportNo"].value; 
    }

}
