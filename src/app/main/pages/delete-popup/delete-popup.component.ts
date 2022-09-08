import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddExpenseComponent } from "../financial-report/add-expense/add-expense.component";

@Component({
    selector: "app-delete-popup",
    templateUrl: "./delete-popup.component.html",
    styleUrls: ["./delete-popup.component.scss"],
    
})
export class DeletePopupComponent implements OnInit {
    getType: any;
    title: string;
    constructor(
        private dialogRef: MatDialogRef<AddExpenseComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        if (data) {
            this.title = " Are you sure you want to Update ?";
        } else {
            this.title = "Are you sure you want to Delete ?";
        }
    }

    ngOnInit(): void {}
    hide() {
        this.dialogRef.close();
    }
    deleteIn(yes) {
        this.dialogRef.close(yes);
    }
}
