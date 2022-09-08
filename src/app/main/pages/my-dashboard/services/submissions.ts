import { StreamInvocationMessage } from "@microsoft/signalr";
import * as internal from "events";

export class SubmissionRequest{
    pageSize: number;
    currentPage: number;    
}


export class GetSubmissionResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];   
    upcomingSubmissionDtos : GetSubmissions[] ;
}

export interface GetSubmissions{
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


