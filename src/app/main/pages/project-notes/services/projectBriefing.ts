export interface GetProjectBriefingResponse {
    projectBriefs: any;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class GetProjectBriefingRequest {
    projectId: number;
    bfa: number;
    gfa: number;
    far: number;    
    noOfStories: string;
}



// export class GetNoteRequest{
//     pageSize: number;
//     currentPage: number;
//     startDate: string;
//     endDate: string;
//     employeeIds: number[] | [];
// }
