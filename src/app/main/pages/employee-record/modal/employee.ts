import { RandomNumberGenerationSource } from "d3";
import { countries } from "./countries";

export class Employee {
    name: string;
    currentStatus: string;
    start: string;
    end: string;
    appliedDate: string;
    statusId: boolean;
    status: string;
}

export class EmployeRegister {
    title:string;
    profilePath: string ;
    employeeCode:string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthday: string;
    gender :string;
    joiningDate: string;
    workLocation: number;
    teamsId:string;
    designationId: number;
    leadId: number;
    status: number;
    salary: string;
    mobileNumber:string;
    passportNumber:string;
    nationality:string;
    personalEmail:string;    
    maritalStatus:string;
    noOfDependents: number;
    phone:string;
    passportExpiry :string;
    religion:string;
    contactId: number;
    employmentStatus: number;
    
}
export class EmployeesRecord {
    employeeIds: number;
    id: number;
    name: string;
    email: string;
    designation: number;
    profilePath: string;
    employmentStatus: number;
    workLocation:number;
    status:number;
}
export interface EmployeResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    employees: EmployeesRecord[];
}




// export class CreateProject  {
//     projectCode?: string | undefined;
//     projectName?: string | undefined;
//     startDate?: Date;
//     endDate?: Date;
//     location?: string | undefined;
//     projectType : number | undefined;
//     id?: number;
// }


export class UpdateEmployeeRequest
{
     id: number ;    
     personalEmail? : string ;
     birthday: string;
     gender : string ;
     passportNumber?: string ;
     mobileNumber: string 
     nationality? : string ;
     status : number ;
     workLocation : number 
     noOfDependents? : number ;     
     title : string;     
     firstName  : string; 
     middleName? : string ;
     lastName   : string; 
     phone?: string ;
     passportExpiry?: string; 
     profilePath: string 
     leadId: number;
     designationId: number;
     maritalStatus?:  string;
     salary : string;
     joiningDate: string;
     employmentStatus: number;
    //  birthday: Date;
    //  passportExpiry : Date;
}



export class EmployeeRequest{
    employeeId:number;
    
}

export class UploadImageResponse{
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    profilePath : string;
}