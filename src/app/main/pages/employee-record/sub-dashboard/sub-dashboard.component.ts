import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-sub-dashboard',
  templateUrl: './sub-dashboard.component.html',
  styleUrls: ['./sub-dashboard.component.scss']
})
export class SubDashboardComponent implements OnInit {
  absentArray=[];
  timeOffArray=[];
  lateCommerArray=[];
  todayDate= new Date();
  constructor(private _service:EmployeeService,   private _fuseConfigService: FuseConfigService,) { 
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
  }

  ngOnInit(): void {

    this._service.getEmployeeTimeOff().subscribe((response:any) =>{
        if(response){
            this.absentArray= response.absent;
            this.timeOffArray = response.onTimeOff;
            this.lateCommerArray = response.lateCommer;
        }
    })
  }

}
