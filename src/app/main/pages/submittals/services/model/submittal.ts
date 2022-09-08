export class Submittal{
     ProjectId: number ;
     ProjectName: string;
     Name: string;
     StartDate: string;
     EndDate:string;    
     EmployeeId?: number | undefined;
     CreatedBy?: number | undefined;
     Id: number;
     Verb: string;
     TaskResourceId?: number | undefined;
}

export class SubmittalRequest{
     //ProjectId: number;
     projectIds:number[] | [];
     riskCase: number;
     
 }

 export class SubmittalResponse{
     errorMessage: string;
     successMessage: string;
     validationErrors: string;
     totalCount: number;
     submittal : Submittal[];
 }