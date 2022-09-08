import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss']
})
export class EmergencyContactComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray =[
        {name:'', value:''}
    ]
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EmergencyContactComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }
  
    ngOnInit(): void {
      this.allocationForm = this.fb.group({
        name: new FormControl(''),
        relationship: new FormControl(''),
        mobile: new FormControl(''),
        TelNumber: new FormControl(''),
        nameSecondary: new FormControl(''),
        relationshipSecondary: new FormControl(''),
        mobileSecondary: new FormControl(''),
        TelNumberSecondary: new FormControl(''),
        })
    }
    profileEdit(){
  
    }

}
