export class ApprovalReportRequest {
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    status: number;
    employeeIds: number[] | [];
}

export interface ApprovalReportResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    approvals: ApprovalReport[];
}

export class ApprovalReport {
    employee: string;
    name: string;
    id: number;
    startDate: string;
    allocatedHours: number;
    actualHours: number;
    checkInDiff: number;
    checkOutDiff: number;
}

export class Approve{
    taskScheduleIds:number[];
}

export interface ApproveResponse{
  errorMessage: string;
  successMessage: string;
  validationErrors:string[];
  
}