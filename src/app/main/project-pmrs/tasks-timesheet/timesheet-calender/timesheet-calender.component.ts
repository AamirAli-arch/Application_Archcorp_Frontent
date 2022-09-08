import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Appointment, Priority, Resource, Service } from '../models/tasktsimesheet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timesheet-calender',
  templateUrl: './timesheet-calender.component.html',
  styleUrls: ['./timesheet-calender.component.scss'],
  providers: [Service],
})
export class TimesheetCalenderComponent implements OnInit {

  appointmentsData: Appointment[];

  resourcesData: Resource[];

  prioritiesData: Priority[];

  currentDate: Date = new Date(2021, 1, 2);


 

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
    this.resourcesData = service.getResources();
    this.prioritiesData = service.getPriorities();
  }


  

  ngOnInit(): void {
  }

}
