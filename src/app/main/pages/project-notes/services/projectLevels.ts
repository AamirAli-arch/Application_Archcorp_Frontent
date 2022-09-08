
//Create : Project Level Commments
export class CreateProjectLevelResponse {
    projectLevels: any;
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class CreateProjectLevelRequest {
    projectId: number;
    issue: string;
    level: number;
    type: number;
    
}


//Get :Project Level Comments 
export class GetProjectLevelCommentsResponse{
    projectLevelComments : ProjectLevelComments[];
    commentArray:ProjectLevelComments[];                                     
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];

    
}

export interface ProjectLevelComments{
        projectId:number;
        issue:string;
        level:string;
        type:string;

        
}


export class GetProjectLevelCommentsRequest{
    projectId?: number;
}


export class CommentData{
     level:string;
     comments: LevelComment[];

}

export class LevelComment{
    type:string;
     issue:string;
     
    
}
export class commentsCount
{
    count :number;
}

