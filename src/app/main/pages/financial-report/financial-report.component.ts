import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LoaderSpinerService } from '../loader-spiner/loader-spiner.service';
import { ReportsService } from '../reports/services/reports.service';
import { ResourceService } from '../site-projection/service/resource.service';
import { AddIncomeComponent } from './add-income/add-income.component';
import { ExpenseList } from './modal/financial';
import { FinancialService } from './service/financial.service';


@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {


    @ViewChild("content", { static: false }) content: ElementRef;
    moment = moment;
    monthArray = [];
    filterForm: FormGroup;
    projectArray;
    setNewArray = [];
    todayDate: string;
    resourceRadio = [
        { name: "Resource", value: 1, checked: true },
        { name: "Project", value: 2 },
    ];
    selectedRadio;
    setActive = 1;
    allocationsArray = [];
    allocationsMonthArray = [];
    ressoureSetArray = [];
    startYear = new Date(new Date().getFullYear(), 0, 1);
    endYear = new Date(new Date().getFullYear(), 11, 31);
    yearArray = [];
    noRecords=false;
    project_Id:any;
    employeeId;
    expenseArrayData: any;
    totalAmount=[];
    confirmAmount:number;
    highriskAmount:number;
    lowRiskAmount:number;
    constructor(
        public dialog: MatDialog,private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private _service: FinancialService,
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            // project: new FormControl([]),
            startDate: new FormControl(this.startYear),
            endDate: new FormControl(this.endYear),
        });
        this.getAllMonth();
        this.getIncomeList();
    }

    getIncomeList(){
        let request = new ExpenseList();
        request.startDate = this.fixDate(this.filterForm.controls["startDate"].value);
        request.endDate =  this.fixDate(this.filterForm.controls["endDate"].value);
        request.projectIds=this.project_Id;
        this._loaderService.show();
        this._service.getIncomeList(request).subscribe((response:any) =>{
            if(response){                
                this._loaderService.hide();
                if (response.projectIncomes.length === 0) {
                    this.expenseArrayData = [];
                    this.noRecords = true;
                    this.totalAmount=[];
                } else {
                    this.noRecords = false;
                    this.expenseArrayData=response.projectIncomes;
                    this.totalAmount=response.totalAmounts;
                    this.confirmAmount=response.confirmed;
                    this.lowRiskAmount=response.lowRisk;
                    this.highriskAmount=response.highRisk;
                }
            }
                
        })
    }

    projectId(Id:any){
        this.project_Id=Id;
        this.getIncomeList();
    }

    ngAfterViewInit(): void {

    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.getAllMonth();
        this.getIncomeList();
    }
    getAllMonth() {
        const startDate: any = moment(
            this.fixDate(this.filterForm.controls["startDate"].value),
            "DD-MMM-YYYY"
        );
        const endDate: any = moment(
            this.fixDate(this.filterForm.controls["endDate"].value),
            "DD-MMM-YYYY"
        );
        const FirstDateYear = startDate.clone().add(-1, "month");
        this.yearArray = [];
        this.monthArray = [];
        //get Arry month of years
        while (+FirstDateYear.add(1, "month") < +endDate) {
            this.yearArray.push({
                name: FirstDateYear.format("MMMM YYYY"),
            });
        }
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
