export class ReportsRequest{
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    startingHalf:string;
    endingHalf:string;
    employeeIds: number[] | [];
    projectIds:number[] | [];
}

export interface ReportsResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    emplyeeAttendance: EmpAttendance[];
}

export interface EmpAttendance{
    id: number;
    name: string;
    checkIn: string;
    checkOut: string;
    workedHours: number;
}

export interface EmpResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    employees: Employee[];
}

export interface Employee{
    id: number;
    name: string;
}

export interface DetailReportResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    employeeCheckInOutDetails: EmpCheckAttendance[];
}

export interface EmpCheckAttendance{
    id: number;
    name: string;
    taskName: string;
    ProjectName: string;
    checkIn: string;
    checkOut: string;
    minutes: number;
    date: string;
    checkInLocDiff: string;
    checkOutLocDiff: string;
}


export interface MonthlyReportResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    emplyeeWorkHours: MonthlyReport[];
}


export interface MonthlyReport{
    id: number;
    name: string;
    workedHours: number;
    allocatedHours: number;
}

