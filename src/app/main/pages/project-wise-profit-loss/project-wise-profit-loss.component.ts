import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { LoaderSpinerService } from '../loader-spiner/loader-spiner.service';
import { ProjectRequest } from './models/project-profitloss';
import { ProjectWiseService } from './services/project-wise.service';

@Component({
  selector: 'app-project-wise-profit-loss',
  templateUrl: './project-wise-profit-loss.component.html',
  styleUrls: ['./project-wise-profit-loss.component.scss']
})
export class ProjectWiseProfitLossComponent implements OnInit {
  filterForm: FormGroup;
  project_Id: any;
  avengers = [];
  projectWiseProfitLoss: any = [];
  startYear = new Date(new Date().getFullYear(), 0, 1);
  endYear = new Date(new Date().getFullYear(), 11, 31);
  @ViewChild('accordion', { static: true }) Accordion: MatAccordion;
  noRecords=false;
  constructor(private _messageNotification: MessageNotifierService, private fb: FormBuilder, private _service: ProjectWiseService, private _loaderService: LoaderSpinerService,) {


  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: new FormControl(this.startYear),
      endDate: new FormControl(this.endYear),
    });
    this.getProfitLossList();
    this.filterForm.valueChanges.subscribe((response: any) => {
      this.getProfitLossList();
    })
  }

  getProfitLossList() {
    const request = new ProjectRequest()
    request.projectIds = this.project_Id;
    request.startDate =
      this.filterForm.controls["startDate"].value == ""
        ? null
        : this.fixDate(
          this.filterForm.controls["startDate"].value
        );
    request.endDate =
      this.filterForm.controls["endDate"].value == ""
        ? null
        : this.fixDate(
          this.filterForm.controls["endDate"].value
        );
    this._loaderService.show();
    this._service.getProjectProfitLossList(request).subscribe((response: any) => {
      if (response) {
        this._loaderService.hide();
        if(response.projectWiseProfitLoss.length==0){
          this.noRecords=true;
          this.projectWiseProfitLoss=[];
        } else{
          this.projectWiseProfitLoss = response.projectWiseProfitLoss;
          this.noRecords=false;
        }
      }
    }, (error) => {
      this._loaderService.hide();
      this._messageNotification.errorMessage(error.error.errorMessage);
    })
  }

  projectId(Id: any) {
    this.project_Id = Id;
    this.getProfitLossList();
  }

  fixDate(date) {
    date = new Date(date);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    return date;
  }

}


