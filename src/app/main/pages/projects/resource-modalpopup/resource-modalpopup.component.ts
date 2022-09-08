import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskTimesheetComponent } from 'app/main/charts/task-timesheet/task-timesheet.component';

@Component({
  selector: 'app-resource-modalpopup',
  templateUrl: './resource-modalpopup.component.html',
  styleUrls: ['./resource-modalpopup.component.scss']
})
export class ResourceModalpopupComponent implements OnInit {
getUser:any;
  constructor( private dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data : any) { 
      this.getUser=data.resources;
  }

  ngOnInit(): void {
  }
  userInitials(name: string){
    return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
}
  onUserClick(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;
    dialogConfig.panelClass = "timeUpdateType";
    const dialogRef = this.dialog.open(TaskTimesheetComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(

    );
  }


}
