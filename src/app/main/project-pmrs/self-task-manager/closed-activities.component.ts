import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
export interface ClosedActivities {
  sno: number;
  projectName: string;
  stage: string;
  activity: string;
  remarks: string;
}

const Closed_Activities: ClosedActivities[] = [
  {sno: 1, projectName: 'Sharjah Coop', stage: 'Concept Design', activity:'In Initial Stage',remarks:'Testing'},
  {sno: 2, projectName: 'Kurdistan Gas Pipeline Network Development', stage: 'Schematic Design', activity:'Almost Finished',remarks:'Testing'},
]


@Component({
  selector: 'app-closed-activities',
  templateUrl: './closed-activities.component.html',
  styleUrls: ['./closed-activities.component.scss']
})
export class ClosedActivitiesComponent implements OnInit {


  displayedColumns: string[] = ['sno', 'projectName', 'stage', 'activity','remarks'];
  dataSource = new MatTableDataSource(Closed_Activities);

  constructor(private _liveAnnouncer : LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    //if (sortState.direction) {
      //this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    //} else {
      //this._liveAnnouncer.announce('Sorting cleared');
    //}
  //}

}
