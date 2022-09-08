export class AwardProjectRequest{
    ProjectId:number;
    Employer:string;
    Location:string;
    PlotNumber:string;
    PlotArea:any;
    GFA:string;
    EstimatedBUA:string;
    NoOfFloors:string;
    ParkingRequired:boolean;
    ExtentionAreas:string;
    ProjectBudget:string;
    Category:string;
    Typology:string;
    SpecialApprovals:string;
    AuthorityId:number;
    MasterDeveloperId:number;
}

export interface AwardResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}


export interface AwardProjectResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    masterScopes:MasterScope[];
}

export class AwardContractRequest{
    BankGuarantee:string;
    Insurance:string;
    DelayPenalty:string;
    Variations:string;
    Suspension:string;
    Termination:string;
    Special:string;
    ProjectId:number;
}

export class AddScopeRequest{
    description:string;
    masterScopeId:number;
}


export class MasterScope{
    Id: number;
    description: String;
    scopes: Scope[];
}

export class Scope{
    Id: number;
    description: String;
    checkBoxChecked: boolean = false;
}

export class CommentRequest{
    scopeId: number;
    note: string;
    projectId:number;
}

export class ViewRequest{
    scopeId: number;
    projectId:number;
}
