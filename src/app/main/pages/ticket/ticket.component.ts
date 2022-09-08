import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TicketDeleteComponent } from "./ticket-delete/ticket-delete.component";
import { TicketEditComponent } from "./ticket-edit/ticket-edit.component";

@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
    styleUrls: ["./ticket.component.scss"],
})
export class TicketComponent implements OnInit {
    filterForm: FormGroup;
    dataSource: any;
    resultsLength = 0;
    displayedColumns = [
        "ticketId",
        "ticket",
        "assignStaff",
        "createDate",
        "reply",
        "priority",
        "status",
        "actions",
    ];
    constructor(
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            employeeName: new FormControl(),
            formDate: new FormControl(),
            toDate: new FormControl(),
            month: new FormControl(""),
            years: new FormControl(""),
        });
    }


    editRecord() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.maxWidth = "100%";
        dialogConfig.minWidth = "600px";
        dialogConfig.width = "400px";
        dialogConfig.height = "600px";
        dialogConfig.panelClass ="ticket-addEdit"
        const dialogRef = this.dialog.open(TicketEditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    deleteRecord() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="taskallocation"

        const dialogRef = this.dialog.open(TicketDeleteComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }
}
