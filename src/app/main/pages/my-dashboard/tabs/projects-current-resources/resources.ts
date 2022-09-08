export class GetCurrentResourcesResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];   
    projectResources : Resources[];
}

export class Resources{
    projectName: string;
    taskName: string;
    employeeName: string;
    progress: string;
    resources?: Resources[];
}
