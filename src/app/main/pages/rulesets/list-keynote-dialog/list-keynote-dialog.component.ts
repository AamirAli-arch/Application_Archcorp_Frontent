import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-list-keynote-dialog',
  templateUrl: './list-keynote-dialog.component.html',
  styleUrls: ['./list-keynote-dialog.component.scss']
  
})
export class ListKeynoteDialogComponent implements OnInit {

  public confirmMessage: string;
  public note : string;
  public totalKeynotesInModel: any;
  
  /**
   * Constructor
   *
   * @param {MatDialogRef<ListKeynoteDialogComponent>} dialogRef
   */
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<ListKeynoteDialogComponent>
  )
  {
      this.note = "";
  }
  close(value){
  }
  ngOnInit(): void {
    console.log("dialog data", this.data)
  }

}


