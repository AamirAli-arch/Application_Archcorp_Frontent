export class SubmissionOverdueRequest{
    pageSize: number;
    currentPage: number;    
}


export class SubmissionOverdueResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];          
    overdueSubmissionDto : GetOverDueSubmissions[] ;
}

export interface GetOverDueSubmissions{
    id : number;
    title : string;    
    plannedDate : string;    
    submittedTo : string;
    
}

export interface SubmissionStages{
    id : number;
    comments : string;
    remarks : string;
    date : string;
    createdDate : string;
}