import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-record-edit',
  templateUrl: './employee-record-edit.component.html',
  styleUrls: ['./employee-record-edit.component.scss']
})
export class EmployeeRecordEditComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray =[
        {name:'', value:''}
    ]
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EmployeeRecordEditComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }
  
    ngOnInit(): void {
      this.allocationForm = this.fb.group({
        name: new FormControl(''),
        joinDate: new FormControl(''),
        department: new FormControl(''),
        designation: new FormControl(''),
        })
    }
    profileEdit(){
  
    }

}
