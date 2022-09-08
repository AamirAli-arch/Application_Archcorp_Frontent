import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpolyeeSchedule, ProjectTaskSchedule } from '../models/resources';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.scss']
})
export class ViewAssignmentsComponent implements OnInit {

  displayedColumns = ['name','startDate','endDate','allocatedHours'];
  dataSource : EmpolyeeSchedule[];
  filterForm: FormGroup;

  constructor(
    public _resourceService: ResourcesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    const request = new ProjectTaskSchedule();
    request.employeeId = this.data.employeeId;
    request.projectId = this.data.projectId;

    this._resourceService.getAssignment(request).subscribe(response => {
      this.dataSource = response.employeeSchedule;
    });

    this.filterForm = this.fb.group({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

}
