export class LeaveRequest{
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    startingHalf:string;
    endingHalf:string;
    status: number;
    employeeIds: number[] | [];
}

export interface ValidationResponse
{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    resourceSchedule: ResourceSchedule[];
  }

  export interface ResourceSchedule{
    id: number;
    startDate: string;
    endDate: string;
    completedDate: string;
    allocatedHours: number;
    actualHours: number;
    isInProgress: boolean;
    isCompleted: boolean;
    taskResourceId: number;
    taskName: string;
    projectName: string;
  }

  export interface ValidationsArray{
    message: string;
    type: string;
    color: string;
  }

  export class LeaveApply{
    startDate: string;
    endDate: string;
    leaveType: number;
    startingHalf:number;
    endingHalf:number;    
    reason: string;
    start: string;
    end: string;
    date:string;
    
  }

  export class EmployeeLeaveRequest{
    pageSize: number;
    currentPage: number;
    startDate: string;
    endDate: string;
    status: number;
    employeeIds: number[];
  }

  export interface EmployeeLeaves{
    employeeId: number;
    empName: string;
    leaveType: string;
    currentStatus: number;
    startDate: string;
    endDate: string;
  }

  export interface EmpolyeeLeaveResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    employeeLeaves: EmployeeLeaves[];
    totalCount: number;
  }

  export interface EmpLeaveDetailsResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    leave: EmpLeaveDetails;
  }

  export class EmpLeaveDetails{
    currentStatus: string;
    employeeDesignation: string;
    employeeId: number;
    employeeName: string;
    endDate: string;
    id: number;
    leaveType: string;
    leaveTypeId: number;
    reason:string;
    startDate: string;
    createdDate:string;
    appliedDate:string
    CreatedDate:string;
  }
  export class ApproveLeavesRequest{
    id: number;
    approvedEndDate: string;
    actualStartDate: string;
  }