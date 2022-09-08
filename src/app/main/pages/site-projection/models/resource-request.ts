export class ResourceRequest {
    pageSize: number;
    currentPage: number;
    projects: [];
    resources: [];
    contracted: number;
    planned: number;
    start: string;
    end: string;
    id: number;
    projectName: string;
    months: string;
    years: string;
    resource: string;
    projectIds: number;
    employeeIds: number;
    allocations: [];
}
export class AllocationProjectWise {
    employeeIds: [];
    projectIds: [];
    startDate: string;
    endDate: string;
    designations: [];
}


