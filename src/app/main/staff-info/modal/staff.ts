export class StaffRequest{
    firstName:string;
    lastName: string ;
    middleName:string;
    age: string;
    birthDate: string;
    birthPlace: string;    
    nationality: string;
    countryOrigin: string;
    gender: string;
    phone: string;
    mobileNumber: string;
    passportNumber: string;
    passportExpiry: string;
    maritalStatus:string;
    visaType : string;
    laborCardNumber : string;
    laborCardExpiry : string;
    licenseNumber : string;
    licenseExpiry: string;
    presentAddress: string;
    permanentAddress: string;
    homePhone : string;
    homeMobileNumber: string;
    personalEmail: string;
    officialEmail: string;
    personName: string;
    relation: string;
    contactNumber: string;
    personEmail:string;
    address: string;
    remark : string;
    appointmentDate: string;
    joinningDate: string;
    staffName : string;
    submitDate : string;
    officialName: string;
    noteDate: string;
    remarks: string;
    officeUse: string;
        
}


export class StaffResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
    staffInformation: StaffInformation[];
}


export interface StaffInformation {        
    // firstName:string;
    // lastName: string ;
    id:number;
    name: string;    
    age: string;
    birthDate: string;
    birthPlace: string;    
    nationality: string;
    countryOrigin: string;
    gender: string;
    phone: string;
    mobileNumber: string;
    passportNumber: string;
    passportExpiry: string;
    maritalStatus:string;
    visaType : string;
    laborCardNumber : string;
    laborCardExpiry : string;
    licenseNumber : string;
    licenseExpiry: string;
    presentAddress: string;
    permanentAddress: string;
    homePhone : string;
    homeMobileNumber: string;
    personalEmail: string;
    officialEmail: string;
    personName: string;
    relation: string;
    contactNumber: string;
    personEmail:string;
    address: string;
    remark : string;
    appointmentDate: string;
    joinningDate: string;
    staffName : string;
    submitDate : string;
    officialName: string;
    noteDate: string;
    remarks: string;
    officeUse: string;
 
}