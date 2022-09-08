export class SubmissionStatusRequest{
    pageSize: number;
    currentPage: number;
    currentStatus: number;    
}


export class GetSubmissionStatusResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];   
    submissionsByStatusDtos : GetSubmissionsStatus[];
}

export interface GetSubmissionsStatus{
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