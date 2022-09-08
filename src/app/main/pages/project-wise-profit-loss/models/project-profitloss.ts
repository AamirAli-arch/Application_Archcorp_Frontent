export class ProjectRequest{
    startDate: string;
    endDate: string;   
    projectIds:number[] | [];
}

export interface ProjectResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    totalCount: number;
    projectWiseProfitLoss:[];
}
