export class departments {
    id: 0;
    name: string;
}
export interface departmentsResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    departments: departments[];
}

export class designations {
    id: 0;
    name: string;
}
export interface designationsResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    designations: designations[];
}

export class employeeProfile {
    name: string;
    designttion: string;
    professionalEmail: string;
    personalEmail: string;
    phone: string;
    birthday: string;
    gender: number;
    passportNumber: string;
    passportExpiry: string;
    mobileNumber: string;
    nationality: string;
    religion: string;
    maritalStatus: number;
    noOfDependents: number;
}

export class educationInfomation {
    id: number;
    institution: string;
    subject: string;
    startDate: string;
    completionDate: string;
    degree: string;
    grade: string;
}

export class experienceInformation {
    id: number;
    company: string;
    location: string;
    from: string;
    to: string;
    position: string;
}

export interface employeeProfileResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class personalInformation {
    id: number;
    personalEmail: string;
    birthday: string;
    gender: string;
    passportNumber: string;
    mobileNumber: string;
    nationality: string;
    employmentStatus: number;
    workLocation: number;
    noOfDependents: number;
    joiningDate: string;
    status: number;
}
