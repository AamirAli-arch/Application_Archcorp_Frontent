import { state } from "@angular/animations";

export class GetAllDasboardDisciplineResponse{
    dashboardDisciplines : DashboardDisciplines[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];    
}

export interface DashboardDisciplines{
    dashboardId:number;
    projectId:number;
    projectName: string;
    //firstName:string;
    groups:string;
    groupStage:string;
    dashboardCreatedBy:number;
    dashboardDate:Date;
    disciplineCreatedBy:number;
    disciplineId:number;
    disciplineDate:Date;
    disciplineModifiedBy:number;
    preBim: string;
    aor: string;
    architecture:string;
    structure: string;
    mechanical: string;
    electrical: string;
    interior: string;
    qs: string;
    //employeeId:any[];
    projectDashboardEmployees:any[]
    
}

// // export interface ProjectDashboardEmployees{
// //      employeeId: number;
// //      firstName: string;
// // }

export class Ratings{
    id:number;
    name: string;
}

export class GroupStages{
    id:number;
    name: string;
}




export class UpdateDesciplineRequest{
    id: number;
    preBim: string | undefined;
    aor:string | undefined;
    architecture:string | undefined;
    structure: string | undefined;
    mechanical: string | undefined;
    electrical: string | undefined;
    interior: string | undefined;
    qs: string | undefined;
    
}


export class UpdateDashboardRequest{
    id: number;
    groupStage: string | undefined;            
}


export class UpdateDashboardGroupRequest{
    id: number;
    groups: string | undefined;            
}



export class AddDashboardResponse{
    projectDashboard: Dashboard;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class Dashboard{
    id:number;
    projectId:number;
    groups:string;
    groupStage:string;
}


export class AddDashboardRequest {
    projectId: number;        
    groupStage:string;
}




export class AddDisciplineResponse{
    discipline: Discipline[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}



export interface Discipline{
    projectDashBoardId: number;
    preBIM: number;    
    architecture:string;
    structure:string;
    mechanical:string;
    electrical:string;    
    interior: string;
    qs: string;
}


export class AddDisciplineRequest {
    projectDashBoardId: number;
    preBIM: number;    
    aor:number;
    architecture:number;
    structure:number;
    mechanical:number;
    electrical:number;    
    interior: number;
    qs: number;
    
}


export class AddEmployeeRequest {
    employeeId: number;    
    projectDashBoardId:number;
    
}


export class DeleteEmployeeRequest{    
    projectDashBoardId: number;
    employeeId: number;
    
    
}


export class AddEmployeeResponse{
    dashboardEmployee: DashboardEmployee;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class DashboardEmployee{
    employeeId:number;
    projectDashBoardId:number;
    
}


// export class DeleteEmployeeRequest{
//     id:number;
// }


export class DeleteEmployeeResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}