import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-assign-modal",
    templateUrl: "./assign-modal.component.html",
    styleUrls: ["./assign-modal.component.scss"],
})
export class AssignModalComponent implements OnInit {
    getType: any;
    title: string;
    constructor(
        private dialogRef: MatDialogRef<AssignModalComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        if (data) {
            this.title = " Are you sure you want to Assign the Project ?";
        } else {
            this.title = " Are you sure you want to Update ?";
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
