import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from "@angular/forms";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";

import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { EmployeeRequest, EmployeRegister, UpdateEmployeeRequest, } from "../modal/employee";
import { MustMatch } from "../password-match";
import { EmployeeService } from "../services/employee.service";
import { ResourcesService } from "../../resources/services/resources.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { countries } from "../modal/countries";
import { FilePond, FilePondOptions } from "filepond";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { validateBasis } from "@angular/flex-layout";

@Component({
    selector: "app-employee-register",
    templateUrl: "./employee-register.component.html",
    styleUrls: ["./employee-register.component.scss"],
})
export class EmployeeRegisterComponent implements OnInit {

    @ViewChild('fileUpload') fileUpload: any;
    @ViewChild('myPond') myPond: any;
    fileToUpload: any;
    imageUrl: string;
    
    profilePath: string;
    private formData: FormData = new FormData();

    pondFiles: FilePondOptions["files"] = [];

    pondOptions: FilePondOptions = {
        allowMultiple: false,
        labelIdle: 'Drop files here...',        
        maxFiles:1,
        acceptedFileTypes:['image/jpeg','image/png'],
        server: {
            timeout: 5000,
            process: (fieldName, file, metadata, load) => {
              // simulates uploading a file
              setTimeout(() => {
                load(Date.now().toString)
              }, 1500);
            },
            load: (source, load) => {
              let controller = new AbortController();
              // simulates loading a file from the server
              fetch(source, {signal:controller.signal}).then(res => res.blob()).then(load).catch(r => { this.myPond.removeFile() });
            },
            
          }  
      };





    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    employmentStatusList = [
        { name: "Consultant", id: 1 },
        { name: "Intern", id: 2 },
        { name: "OnContract", id: 3 },
        { name: "Permanent", id: 4 },
        { name: "Temporary", id: 5 },
        { name: "Trainee", id: 6 },
        { name: "Probation", id: 7 },
    ];
    workLocationList = [
        { name: "Office", id: 1 },
        { name: "Site", id: 2 },
    ];
    titleList = [
        { name: "Mr.", value:"Mr." },
        { name: "Mrs.", value:"Mrs." },
        { name: "Miss.", value:"Miss." },
        { name: "Ms.", value:"Ms." },
    ];
    
    genderList =[
        {name: "Male", value:1},
        {name: "Female", value:2},
        {name: "UnSpecified", value:3},
    ]

    maritalStatusList =[
        {name: "Single", value:1},
        {name: "Married", value:2},
        {name: "Separated", value:3},
        {name: "Divorced",value:4},
        {name: "Widowed",value:5},
    ]


    employeeStatusList =[
        {name : "On Work", value:1},
        {name : "On Leave", value:2},
    ]
    showEdit:true;    
    public countries:any = countries
    



    degisationList=[];
    employeeList=[];
    id: any;
    
    constructor(
        private fb: FormBuilder,private _messageNotification:MessageNotifierService,
        private dialogRef: MatDialogRef<EmployeeRegisterComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _loaderService: LoaderSpinerService,
        private _services: EmployeeService,
        private _resourceService: ResourcesService,
        
        
    ) {}

    

    ngOnInit(): void {

        if(this.data != null){
            
                this._services.getEmployeeDetail(this.data).subscribe((response: any) => {
                     console.log('getEmployee',response)
                     let editProfilePath = response.employeeDetail.profilePath;
                    //  if(response.employeeDetail.profilePath == null)
                    //  {
                    //     this._loaderService.hide();
                    //         this.dialogRef.close();
                    //         this._messageNotification.errorMessage(response.errorMessage);
                    
                    //  if(response.employeeDetail.profilePath.charAt(0) === "/"){
                    //     editProfilePath = response.employeeDetail.profilePath.substring(1);
                        
                    //  }else{
                    //     editProfilePath = response.employeeDetail.profilePath;
                        
                    //  }
                    // }
                     console.log("editfilepath", editProfilePath)
                    //Mantdatory
                      if(response.employeeDetail.profilePath){
                        let objFile : FilePondOptions["files"]= [{
                            source:  editProfilePath,  
                            //source: response.employeeDetail.profilePath,                            
                            options: {
                              type: 'local',                                                          
                            }
                          }]
                        this.pondFiles = objFile;                        
                      }

                     
                     this.allocationForm.controls['title'].setValue(response.employeeDetail.title); 
                     this.allocationForm.controls['firstName'].setValue(response.employeeDetail.firstName);                        
                     this.allocationForm.controls['lastName'].setValue(response.employeeDetail.lastName);                               
            
                     this.allocationForm.controls['leadId'].setValue(response.employeeDetail.leadId);                    
                     this.allocationForm.controls['designationId'].setValue(response.employeeDetail.designationId);      
                     this.allocationForm.controls['mobileNumber'].setValue(response.employeeDetail.mobileNumber);
                     this.allocationForm.controls['gender'].setValue(response.employeeDetail.gender);                     
                     this.allocationForm.controls['status'].setValue(response.employeeDetail.status);
                     this.allocationForm.controls['employmentStatus'].setValue(response.employeeDetail.employmentStatus);

                     var bDayDate = new Date(response.employeeDetail.birthday);
                     if(bDayDate.getFullYear() > 1000){
                        this.allocationForm.controls['birthday'].setValue(response.employeeDetail.birthday);
                     }
                     


                     this.allocationForm.controls['workLocation'].setValue(response.employeeDetail.workLocation);   

                    //Optional
                     this.allocationForm.controls['middleName'].setValue(response.employeeDetail.middleName);   
                     this.allocationForm.controls['phone'].setValue(response.employeeDetail.phone);   
                     this.allocationForm.controls['personalEmail'].setValue(response.employeeDetail.personalEmail);                                              
                     this.allocationForm.controls['passportNumber'].setValue(response.employeeDetail.passportNumber); 

                     var passExpDate = new Date(response.employeeDetail.passportExpiry);
                     if(passExpDate.getFullYear() > 1000){
                     this.allocationForm.controls['passportExpiry'].setValue(response.employeeDetail.passportExpiry);                     
                     }
                     
                     
                    this.allocationForm.controls['joinDate'].setValue(response.employeeDetail.joiningDate);    
                     this.allocationForm.controls['nationality'].setValue(response.employeeDetail.nationality);                                           
                     this.allocationForm.controls['maritalStatus'].setValue(response.employeeDetail.maritalStatus);
                     this.allocationForm.controls['noOfDependents'].setValue(response.employeeDetail.noOfDependents);
                     

                     this.allocationForm.controls['salary'].setValue(response.employeeDetail.salary);

                     //disabled for the reason of sensitivity
                     this.allocationForm.controls['email'].disable();
                     this.allocationForm.controls['password'].disable();
                     this.allocationForm.controls['confirmPassword'].disable();
                     
                     
                    

                })             
            }

        this.allocationForm = this.fb.group(
            {
                title: ["", Validators.required],                         
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                middleName: [""],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(6)]],
                confirmPassword: ["", Validators.required],
                mobileNumber: ["", Validators.required],                            
                gender: ["", Validators.required],                                    
                designationId: ["", Validators.required],
                leadId: ["", Validators.required],
                workLocation: ["", Validators.required],
                status: ["", Validators.required],                                
                personalEmail:["", Validators.email],
                birthday: ["", Validators.required],                
                nationality:[""],
                passportNumber: [""],
                joinDate: ["", Validators.required],                
                profilePath:["",Validators.required],
                employeesalary: [""],
                maritalStatus :[""],
                noOfDependents:[""],
                phone :[""],
                passportExpiry:[""],
                religion:[""],
                contactId:[""],
                employmentStatus:["",Validators.required],
                salary:[""]

            },
            {
                validator: MustMatch("password", "confirmPassword"),
            }
        );
        this._services.getDesignationsList().subscribe((response: any) => {
            if (response) {
                this.degisationList = response.designations;
            }
        })

        this._resourceService.getEmployees().subscribe((response: any) => {
            if (response) {
                this.employeeList = response.employees;
            }          
        })


    }
    onSubmit() {
        console.log("onsubmit",this.allocationForm)
        if (this.allocationForm.valid) {
            let request = new EmployeRegister();

            request.title = this.allocationForm.controls['title'].value;   
            request.profilePath= this.imageUrl;


            request.firstName = this.allocationForm.controls['firstName'].value;
            request.lastName = this.allocationForm.controls['lastName'].value;

            request.middleName = this.allocationForm.controls['middleName'].value;
            request.email = this.allocationForm.controls['email'].value;
            
            request.password = this.allocationForm.controls['password'].value;            
            request.confirmPassword = this.allocationForm.controls['confirmPassword'].value;

            
            request.mobileNumber= this.allocationForm.controls['mobileNumber'].value;            
            request.gender = this.allocationForm.controls['gender'].value;
            

            request.designationId = this.allocationForm.controls['designationId'].value;
            request.leadId = this.allocationForm.controls['leadId'].value;
            
            request.workLocation = this.allocationForm.controls['workLocation'].value;
            request.status = this.allocationForm.controls['status'].value;
            request.employmentStatus = this.allocationForm.controls['employmentStatus'].value;

                                   
            request.joiningDate = this.fixDate(this.allocationForm.controls['joinDate'].value);            
            request.birthday = this.fixDate(this.allocationForm.controls['birthday'].value);

            
            request.salary = this.allocationForm.controls['salary'].value;
            
            this._loaderService.show();
            this._services.employeeRegister(request).subscribe(
                (response) => {
                    if (response.errorMessage == null) {
                        this._loaderService.hide();
                        this.dialogRef.close();
                        this._messageNotification.successMessage(response.successMessage);
                    }
                },
                (error) => {
                    this._loaderService.hide();
                    this._messageNotification.errorMessage(error.error.errorMessage);
                }
            );
        }
    }
    pondHandleInit() {
        //console.log('FilePond has initialised', this.myPond);
      
    }

    pondHandleAddFile(event: any) {
        var fileSource = event.file.source;

        if(event.file.origin != 1) { return; }
        if(event.file.origin == 1){
            console.log("uploading Image")
            this.formData.append("file", event.file.file);
            this._services.uploadImage(this.formData).subscribe((response : any) => {
                if(response.errorMessage == null){
                    this.imageUrl = response.profilePath;
                    this.allocationForm.controls['profilePath'].setValue(this.imageUrl);   
                }
            })
        }
       
    }


    


    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);    
        return date;
    }



    handleUpload(e):void{
        this.imageUrl = e.target.value;
        this.myPond.getFile();            
     }

    
     

    updateEmployeeDetails(){

        const request = new UpdateEmployeeRequest();
        request.id = this.data;
        request.title = this.allocationForm.controls['title'].value;
        request.profilePath = this.imageUrl;
        request.firstName = this.allocationForm.controls['firstName'].value;
        request.lastName = this.allocationForm.controls['lastName'].value;        
        request.mobileNumber = this.allocationForm.controls['mobileNumber'].value;
        request.gender = this.allocationForm.controls['gender'].value;
        request.designationId = this.allocationForm.controls['designationId'].value;
        request.leadId = this.allocationForm.controls['leadId'].value;
        request.workLocation = this.allocationForm.controls['workLocation'].value;
        request.status = this.allocationForm.controls['status'].value;        
        request.workLocation = this.allocationForm.controls['workLocation'].value;
        request.birthday = this.fixDate(this.allocationForm.controls['birthday'].value);
        request.joiningDate = this.fixDate(this.allocationForm.controls['joinDate'].value);
        request.employmentStatus = this.allocationForm.controls['employmentStatus'].value;
        
        request.middleName = this.allocationForm.controls['middleName'].value;
        request.passportExpiry = this.fixDate(this.allocationForm.controls['passportExpiry'].value);
        request.maritalStatus = this.allocationForm.controls['maritalStatus'].value;
        request.noOfDependents = this.allocationForm.controls['noOfDependents'].value;
        request.personalEmail = this.allocationForm.controls['personalEmail'].value;        
        request.phone = this.allocationForm.controls['phone'].value;
        request.nationality= this.allocationForm.controls['nationality'].value;
        request.passportNumber = this.allocationForm.controls['passportNumber'].value;
        request.salary = this.allocationForm.controls['salary'].value;

        
        console.log('update request',request)
        this._loaderService.show();
        this._services.updateEmployee(request).subscribe(
            (response) => {
                if (response.errorMessage == null) {
                    this._loaderService.hide();
                    this.dialogRef.close();
                    this._messageNotification.successMessage(response.successMessage);
                    
                }
            },
            (error) => {
                this._loaderService.hide();
                this._messageNotification.errorMessage(error.error.errorMessage);
            }
        );

    }
     
 
}
    
