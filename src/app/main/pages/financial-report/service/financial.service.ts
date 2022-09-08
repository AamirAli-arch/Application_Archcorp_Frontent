import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AddExpenseType, AddIncomeRequest, ExpectedIncome, ExpenseList, ExpensePaginationRequest, ExpensePaginationResponse, FinancialReport, FinancialResponse } from '../modal/financial';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getExpenseListPagination(request:ExpensePaginationRequest): Observable<ExpensePaginationResponse> {
        return this.http.post<ExpensePaginationResponse>(this.baseUrl + "/api/Expense/GetExpenses", request);
    }

    getIncomeListPagination(request:ExpensePaginationRequest): Observable<ExpensePaginationResponse> {
        return this.http.post<ExpensePaginationResponse>(this.baseUrl + "/api/Income/GetIncomes", request);
    }

    getExpenseTypeList(): Observable<FinancialResponse> {
        return this.http.get<FinancialResponse>(this.baseUrl + "/api/ExpenseType/GetList");
    }

    getExpenseDescription(id): Observable<FinancialResponse> {
        return this.http.get<FinancialResponse>(this.baseUrl + "/api/ExpenseDescription/GetList?expenseType="+id);
    }

    addExpense(request:FinancialReport): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Expense/Add",request);
    }

    updateExpense(request:FinancialReport): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Expense/Update",request);
    }

    deleteExpense(request:FinancialReport): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Expense/Delete",request);
    }

    deleteIncome(request:FinancialReport): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Income/Delete",request);
    }

    getExpenseList(request:ExpenseList): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Expense/GetExpensesForReport", request);
    }

    addIncome(request:AddIncomeRequest): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Income/Add", request);
    }

    updateIncome(request:AddIncomeRequest): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Income/Update", request);
    }

    getProjectIncomeStages(request:AddIncomeRequest): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Income/GetProjectIncomeStages",request);
    }

    getIncomeList(request:ExpenseList): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/Income/GetIncomesForReport", request);
    }

    addExpenseType(request:AddExpenseType): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/ExpenseType/Add",request);
    }

    addDescriptionType(request:AddExpenseType): Observable<FinancialResponse> {
        return this.http.post<FinancialResponse>(this.baseUrl + "/api/ExpenseDescription/Add",request);
    }

    getExpectedIncomeList(request:ExpectedIncome): Observable<ExpensePaginationResponse> {
        return this.http.post<ExpensePaginationResponse>(this.baseUrl + "/api/ExpectedIncome/Get", request);
    }

    addExpectedIncome(request:ExpectedIncome): Observable<ExpensePaginationResponse> {
        return this.http.post<ExpensePaginationResponse>(this.baseUrl + "/api/ExpectedIncome/Add", request);
    }

    deleteExpectedIncome(request:ExpectedIncome): Observable<FinancialResponse> {
        return this.http.delete<FinancialResponse>(this.baseUrl + "/api/ExpectedIncome/Delete/"+request.id);
    }

    updateExpectedIncome(request:ExpectedIncome): Observable<ExpensePaginationResponse> {
        return this.http.post<ExpensePaginationResponse>(this.baseUrl + "/api/ExpectedIncome/Update", request);
    }
}
