export class SystemRequest {
    id:number ;
    name:string
}
export class AddsystemRequest {
    projectId:number ;
    disciplineId:number;
    systemId:number;
    subSystemId:number;
    comment:string;
    file:any;
}
export interface SystemResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    systems: SystemRequest[];
}
