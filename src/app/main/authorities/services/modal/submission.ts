export interface SubmissionResponse {
    submissions: any;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class SubmissionPlan{
    title: string;
    description:string
    plannedDate:string;
    submittedTo:string;
    stageId:number;
    projectId:number;
    comments:string;
    responsibleResources:number[];
}

export class SubmissionCardPlan{
    projectIds:number[] | [];

}

export class ProjectWithSubmissionPlan{
    projectId:number;
    status:number;
    submittedTo:string;
    stageId: number;
}

export interface SubmissionProjectResponse {
    submissions: MainSubmissions[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class MainSubmissions{
    id:number;
    projectCode: string;
    projectName:string;
    startDate: string;
    endDate: string;
    Submissions:Submissions[];
}
export class Submissions{
    id:number;
    title: string;
    description:string
    plannedDate:string;
    approvedDate:string;
    reSubmission: string;
    validity: string;
    currentStatus:number;
    currentStatusString: string;
    authority: string;
    masterDeveloper: string;
    stage: string;
}

export class AddStage{
    comments: string;
    remarks: string;
    date: string;
    status: number
    submissionId:number;
    validity:string;
}