
export interface RegisterEmployee{
    title:string;
    employeeCode:number;
    email:string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string;
    lastName : string;
    joinningDate : string;
    workLocation: string;
    designationId : string;
    contactId : string;
    salary: number;    
}

export class RegisterUserResponse{
    employee: RegisterEmployee[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}



export class RegisterUserRequest{
    title:string;
    employeeCode:number;
    email:string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string;
    lastName : string;
    joinningDate : string;
    workLocation: string;
    designationId : string;
    contactId : string;
    salary: number;  
}


