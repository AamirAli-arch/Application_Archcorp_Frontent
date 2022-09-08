import { NumberFilter } from "ag-grid-community";

export interface CreateNoteResponse {
    riskNotes: any;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export interface GetNoteResponse {
    //riskNotesDto: any[];
    riskNotesDto: RiskNotes[];
    totalCount: number;
    errorMessage: string;
    successMessage: string;
    //pageIndex:number;
    //pageSize: number;
    validationErrors: string[];
}

export interface RiskNotes{
    projectName: string;    
    noteType:string;
    priority: string;
    stage:string;
    implication: string;
    riskProfile: string;
    Note:string;
    createdBy:string;
    dueDate: number;
    employeesTo: string;
    employeesCc: string;
    
}




export class CreateNoteRequest {
    projectId: number;
    stageId: number;
    noteType: number;
    priority: number;
    implication: number;
    riskProfile: number;
    note: string;
    dueDate:string;    
    createdBy: string;
    notesResources:number[];
    notesResourcesCC:number[];
    noteId:number;
    
}

export class GetNoteRequest{
    pageSize: number;
    currentPage: number;
    //projectId: number;
    //startDate: string;
    //endDate: string;
    //employeeIds: number[] | [];
    //employeeIdsCC: number[] | [];
}

export class GetBriefRequest {
    projectId: number;
}


