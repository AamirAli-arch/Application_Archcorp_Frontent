export class TimeLineRequest{
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    projectIds: number[] | [];
    employeeIds: number[] | [];
}

export interface TimeLineResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}