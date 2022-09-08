import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray =[
        {name:'', value:''}
    ]
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TicketEditComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }
  
    ngOnInit(): void {
      this.allocationForm = this.fb.group({
        ticketName: new FormControl(''),
        ticketId: new FormControl(''),
        staff: new FormControl(''),
        client: new FormControl(''),
        priority: new FormControl(''),
        ccName: new FormControl(''),
        assign: new FormControl(''),
        ticketAssignee: new FormControl(''),
        addFollower: new FormControl(''),
        ticketFollower: new FormControl(''),
        description: new FormControl(''),
        upload: new FormControl('')
        })
    }
    profileEdit(){
  
    }

}
