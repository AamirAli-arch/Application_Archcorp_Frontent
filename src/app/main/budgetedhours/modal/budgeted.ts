export interface BudgetHoursResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class AddBudgetRequest {
    budgetedHours:number;
    projectId:number;
    designationId:number;
    id:number;
}
 export class ResourceHour{
    hours:number;
    employeeId:number;
    projectId:number;
    designationId:number
    id:number;
 }