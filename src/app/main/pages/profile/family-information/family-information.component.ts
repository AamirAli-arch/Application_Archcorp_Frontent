import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.scss']
})
export class FamilyInformationComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray =[
        {name:'', value:''}
    ]
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FamilyInformationComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }
  
    ngOnInit(): void {
      this.allocationForm = this.fb.group({
        name: new FormControl(''),
        relationship: new FormControl(''),
        mobile: new FormControl(''),
        brithDate: new FormControl(''),
        })
    }
    profileEdit(){
  
    }


}
