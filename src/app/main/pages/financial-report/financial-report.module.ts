import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddIncomeComponent } from "./add-income/add-income.component";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { FinancialReportComponent } from "./financial-report.component";
import { AppPipesModule } from "app/main/pipes/app-pipes.module";
import { ExpenseReportComponent } from "./expense-report/expense-report.component";
import { AddExpenseComponent } from "./add-expense/add-expense.component";
import { SingleProjectdropdownComponent } from "./single-projectdropdown/single-projectdropdown.component";
import { IncomeTablePaginationComponent } from "./income-table-pagination/income-table-pagination.component";
import { ExpenseTablePaginationComponent } from "./expense-table-pagination/expense-table-pagination.component";
import { AddDescriptionTypeComponent } from './add-description-type/add-description-type.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { ExpectedIncomePaginationComponent } from './expected-income-pagination/expected-income-pagination.component';
import { AddExpectedIncomeComponent } from './add-expected-income/add-expected-income.component';
import { GanttComponent } from './chart/gantt/gantt.component';
import { DxGanttModule } from 'devextreme-angular';


const routes = [
    {
        path: "income-report",
        component: FinancialReportComponent,
    },
    {
        path: "expense-report",
        component: ExpenseReportComponent,
    },
    {
        path: "expected-income",
        component: ExpectedIncomePaginationComponent,
    },
    {
        path: "expense",
        component: ExpenseTablePaginationComponent,
    },
    {
        path: "income",
        component: IncomeTablePaginationComponent,
    },
    {
        path: "finance-gantt",
        component: GanttComponent,
    },
];


@NgModule({
    declarations: [
        AddIncomeComponent,
        FinancialReportComponent,
        ExpenseReportComponent,
        AddExpenseComponent,
        SingleProjectdropdownComponent,
        IncomeTablePaginationComponent,
        ExpenseTablePaginationComponent,
        AddDescriptionTypeComponent,
        ExpectedIncomePaginationComponent,
        AddExpectedIncomeComponent,
        GanttComponent,
    ],
    entryComponents: [
        AddIncomeComponent,
        AddExpenseComponent,
        SingleProjectdropdownComponent,
        AddDescriptionTypeComponent,
        AddExpectedIncomeComponent
    ],
    imports: [
        MatTableExporterModule,
        CommonModule,
        FuseSharedModule,
        AppPipesModule,
        DxGanttModule,                
        RouterModule.forChild(routes),
    ],
})
export class FinancialReportModule {}
