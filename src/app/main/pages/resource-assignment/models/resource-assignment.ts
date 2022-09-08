export class TaskRequest{
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
    duration: number;
    verb: string;
    parentTaskId: number;
    employeeId: number;
    projectIds: number[]
}