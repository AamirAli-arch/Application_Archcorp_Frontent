import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { FinancialService } from '../../service/financial.service';

import { ExpenseList, GanttDetails } from '../../modal/financial';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {

  expenseArrayData: any = [];
  noRecords = false;
  updateValue: any = [];
  tempoverHeadTotal: number = 0;
  totalSalaryOverhead: number = 0;
  hours: number = 0;
  netProfit: any = [];
  monthlyArray: any = [];
  overallProfit: number;
  expectedIncome: number;
  lowRiskIncome: number;
  overallExpense: number;
  provisions: number;
  overHeadTotal: number = 0;

  totalAmount = [];
  confirmAmount: number;
  highriskAmount: number;
  lowRiskAmount: number;

  listDetails: GanttDetails[] = [];

  tasks: GanttDetails[] = []

  constructor(
    public dialog: MatDialog,
    private _loaderService: LoaderSpinerService,
    private fb: FormBuilder,
    private _service: FinancialService) { }

  ngOnInit(): void {
    this.getIncomeList();
    //this.getExpenseList();
  }

  getIncomeList() {
    let request = new ExpenseList();
    this._service.getIncomeList(request).subscribe((response: any) => {
      if (response) {
        this._loaderService.hide();
        if (response.projectIncomes.length === 0) {
          this.expenseArrayData = [];
          this.noRecords = true;
          this.totalAmount = [];
        } else {
          this.noRecords = false;
          this.expenseArrayData = response.projectIncomes;
          this.totalAmount = response.totalAmounts;
          this.confirmAmount = response.confirmed;
          this.lowRiskAmount = response.lowRisk;
          this.highriskAmount = response.highRisk;

          //manipulate the data
          var apiListDetails:GanttDetails[] = [];
          this.expenseArrayData.forEach(element => {
            let ganttDetails = new GanttDetails();
            ganttDetails.id = element.id;
            ganttDetails.title = element.name;
            ganttDetails.parentId = -1;
            var projectDates = this.getProjectPaymentStartEnd(element.projectIncomes);
            ganttDetails.start = new Date(projectDates[0].getFullYear(), projectDates[0].getMonth(), 1);
            ganttDetails.end = new Date(projectDates[projectDates.length - 1].getFullYear(), projectDates[projectDates.length - 1].getMonth() + 1, 0) ;
            ganttDetails.amount = 100;
            apiListDetails.push(ganttDetails)
          });
          
          this.listDetails = apiListDetails;
          console.log(this.listDetails)
        }
      }
    })
  }

  getProjectPaymentStartEnd(details: any){
    let allMonths = [];
    details.forEach(element => {
      element.incomeAmounts.forEach(e => {
        let newDate = new Date(e.year, e.month, null);
        allMonths.push(newDate);
      });
    });
    return allMonths.sort((a,b) => Date.parse(a) - Date.parse(b));
  }

  flat(array) {
    var result = [];
    array.forEach(function (a) {
      result.push(a);
      if (Array.isArray(a.children)) {
        result = result.concat(this.flat(a.children));
      }
    });
    return result;
  }

  getExpenseList() {
    let request = new ExpenseList();
    this._loaderService.show();
    this._service.getExpenseList(request).subscribe((response: any) => {
      if (response) {
        this._loaderService.hide();
        if (response.expensesList.length === 0) {
          this.expenseArrayData = [];
          this.noRecords = true;
        } else {
          this.noRecords = false;
          this.expenseArrayData = response.expensesList;
          this.updateValue = response.expensesList;
          //this.overHeadTotal=0;
          this.expenseArrayData.forEach((element, i) => {
            if (element.id !== 1) {
              this.tempoverHeadTotal += element.total
            }
            element.expenses.forEach(expen => {
              expen.hours = this.hours;
              expen.overhead = (expen.total * expen.hours) / 100;
            });
          });
          this.overHeadTotal = this.tempoverHeadTotal;
          this.netProfit = response.netResult;
          this.monthlyArray = response.monthlyTotalExpenses;
          this.overallProfit = response.overallProfit;
          this.expectedIncome = response.expectedIncome;
          this.lowRiskIncome = response.lowRiskIncome;
          this.overallExpense = response.overallExpense;
          this.provisions = response.provisions;
        }
      }
    })
  }

}
