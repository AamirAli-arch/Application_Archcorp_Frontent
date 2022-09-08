import { Injectable } from "@angular/core";

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

// export class Employee {  
//   name: string;
//   }


// const employees: Employee[] = [
//     {  
//       name: 'Aamir',            
//     },
// ];
  
  

//   @Injectable()
//   export class Appoint {
//   getAllEmployee(): Employee[] {
//     return employees;
    
// 
// }
//}