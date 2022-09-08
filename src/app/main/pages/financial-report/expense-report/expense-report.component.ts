import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FinancialService } from '../service/financial.service';
import { ExpenseList } from '../modal/financial';
import { AddDescriptionTypeComponent } from '../add-description-type/add-description-type.component';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
const moment = extendMoment(Moment);

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {

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
    expenseArrayData:any=[];
    netProfit:any=[];
    monthlyArray:any=[];
    overallProfit:number;
    expectedIncome:number;
    lowRiskIncome:number;
    overallExpense:number;
    provisions:number;
    overHeadTotal:number = 0;
    hours: number=0;
    updateValue:any=[];
    tempoverHeadTotal: number = 0;
    totalSalaryOverhead: number = 0;
    totalMonthlyAccumulated: number = 0;
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
        this.getExpenseList();

    }
    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode != 46
        ) {
            return false;
        }
        return true;
    }
    getExpenseList(){
        let request = new ExpenseList();
        request.startDate = this.fixDate(this.filterForm.controls["startDate"].value);
        request.endDate =  this.fixDate(this.filterForm.controls["endDate"].value)
        this._loaderService.show();
        this._service.getExpenseList(request).subscribe((response:any) =>{
            if(response){
                this._loaderService.hide();
                if (response.expensesList.length === 0) {
                    this.expenseArrayData = [];
                    this.noRecords = true;
                } else {
                    this.noRecords = false;
                    this.expenseArrayData=response.expensesList;
                    this.updateValue=response.expensesList;
                    //this.overHeadTotal=0;
                    this.expenseArrayData.forEach((element,i) => {
                        if(element.id !== 1){
                            this.tempoverHeadTotal+=element.total
                        }
                            element.expenses.forEach(expen => {
                                expen.hours=this.hours;
                                expen.overhead=(expen.total*expen.hours)/100;
                            });
                    });
                    this.overHeadTotal = this.tempoverHeadTotal;
                    this.netProfit=response.netResult;
                    this.monthlyArray=response.monthlyTotalExpenses;
                    this.overallProfit = response.overallProfit;
                    this.expectedIncome = response.expectedIncome; 
                    this.lowRiskIncome = response.lowRiskIncome;
                    this.overallExpense = response.overallExpense;
                    this.provisions = response.provisions;
                    
                    //Set Total Monthly Accumulated
                    this.monthlyArray.forEach(element => {
                        this.totalMonthlyAccumulated += element.amount;
                    });
                }
            }
        })
    }


    update(hours, id){
         let overheadValue:number=0;
         let salaryExpenses = this.expenseArrayData.find(key => key.id == 1);
         console.log(salaryExpenses);
         salaryExpenses.expenses.forEach(element => {
            if(id===element.id){
                element.overhead=(element.total*hours)/100;
            }
           overheadValue+=element.overhead;
        });
        this.overHeadTotal=this.tempoverHeadTotal+overheadValue;

        this.totalSalaryOverhead = salaryExpenses.expenses.reduce(function(sum, current) {
            return sum + current.overhead;
          }, 0);
    }
    
    projectId(Id:any){
        this.project_Id=Id;
    }

    ngAfterViewInit(): void {

    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.getAllMonth();
        this.getExpenseList();
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
