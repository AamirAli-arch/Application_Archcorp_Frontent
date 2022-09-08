
export class FinancialReport {
    amount: number;
    expenseDescriptionId:number;
    expenseTypeId: number;
    date: string;
    paymentDate:string;
    id:number;
    start: string;
    end: string;
    isMultiple:boolean;
}

export class ExpectedIncome {
    pageSize: number;
    currentPage: number;
    amount: number;
    date: string;
    projectName:string;
    id:number;
    searchTerm:string;
}

export class ExpensePaginationRequest{
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    type: number;
    description:number;
    projectIds:[];
   
}

export interface ExpensePaginationResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    expenses: [];
    incomes:[];
    expectedIncomes:[];
}

export class ExpenseList {
    startDate: string;
    endDate:string;
    projectIds: [];
}

export class AddExpenseType {
    name:string;
    expenseTypeId: number;
}

export class AddIncomeRequest {
    amount: number;
    date:string;
    start: string;
    end: string;
    projectId:number;
    stage:string;
    id:number;
    incomeType:number;
    isMultiple:boolean;
}

export interface FinancialResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}


export class GanttDetails{
    id:number;
    parentId:number;
    start:Date;
    end:Date;
    title:string;
    amount:number;
}