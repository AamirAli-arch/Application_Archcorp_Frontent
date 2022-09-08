import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss']
})
export class EmployeeAttendanceComponent implements OnInit {
    filterForm: FormGroup;
    dataSource: any;
    resultsLength = 0;
    displayedColumns = [
        "date",
        "punchIn",
        "punchOut",
        "production",
        "break",
        "overTime",
       
    ];
    constructor(
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private fb: FormBuilder,  private router: Router
    ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
        startingDate: new FormControl(),
        month: new FormControl(""),
        years: new FormControl(""),
    });
  }

}
