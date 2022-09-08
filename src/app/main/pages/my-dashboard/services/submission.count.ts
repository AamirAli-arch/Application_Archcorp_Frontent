export class SubmissionCountResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    submissionCountDto : GetSubmissionCount[];    
}


export interface GetSubmissionCount{
    totalCount: number,
    currentStatus: string;
}


