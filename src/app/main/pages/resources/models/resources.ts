export interface ResourceProjects{
    projectId: number;
    projectName: string;
    assignedHours: number;
    totalHours: number;
}

export class ResourceList{
    name: string;
    projects: ResourceProjects[]
}

export class WorkLoadRequest{
    employeeIds: number[];
    projectIds: number[];
    startDate: string;
    endDate: string;
}

export class ViewAssignmentData{
    employeeId: number;
    projectId: number;
}


export interface WorkloadResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    employeeWorkload: ResourceList[];
}

export class ProjectTaskSchedule{
    employeeId: number;
    projectId: number;
    start: string;
    end: string;
}

export interface EmpolyeeSchedule{
    employeeName: string;
    id: number;
    startDate: string;
    endData: string;
    allocatedHours: number;
}