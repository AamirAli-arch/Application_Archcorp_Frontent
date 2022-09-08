import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { countries } from 'app/main/pages/employee-record/modal/countries';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { request } from 'http';
import {  StaffRequest } from '../modal/staff';
import { StaffInfoService } from '../services/staff-info.service';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  staffInfoForm: FormGroup;
  public countries:any = countries;
  
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

  visaStatusList =[
    {name :'Visit', value:1},
    {name :'Employment', value:2},
    {name :'Cancelled', value:3},
    {name: 'Dependent', value:4},
    {name: 'Other', value:5},
  ]  

  constructor(private fb: FormBuilder,
    private _loaderService: LoaderSpinerService,
    private _services: StaffInfoService,
    private router: Router,
    private _messageNotification:MessageNotifierService) { }

  ngOnInit(): void {
    
    this.staffInfoForm = this.fb.group({

      firstName: ["", Validators.required],
      middleName:[""],
      lastName :["", Validators.required],

      age :["", Validators.required],
      birthDate :["", Validators.required],
      gender :["",Validators.required],

      birthPlace :["", Validators.required],
      nationality :["", Validators.required],
      countryOrigin:["", Validators.required],

      maritalStatus:["", Validators.required],
      phone:[""],
      mobileNumber:["",Validators.required],

      passportNumber:["", Validators.required],
      passportExpiry: ["", Validators.required],
      visaType:["",Validators.required],
      laborCardNumber:[""],
      laborCardExpiry:[""],
      licenseNumber:[""],
      licenseExpiry:[""],
      presentAddress:["", Validators.required],
      permanentAddress:["", Validators.required],
      homeMobileNumber:["", Validators.required],
      homePhone:[""],
      personalEmail:["", Validators.email],
      personName :["",Validators.required],
      relation:[""],
      contactNumber:["",Validators.required],
      personEmail: ["",Validators.email],
      address:[""],
      remark:[""],
      officialEmail:["", Validators.email],   
      appointmentDate:["",Validators.required],
      joinningDate:["",Validators.required],      
      staffName:["",Validators.required],
      submitDate:["",Validators.required],
      officialName:[""],
      noteDate:[""],
      remarks:[""],
      officeUse:[""],
    });

   
  }

  onSubmit() {
    console.log("onsubmit",this.staffInfoForm)
    if (this.staffInfoForm.valid) {
        let request = new StaffRequest();

        request.firstName = this.staffInfoForm.controls['firstName'].value;   
        request.middleName = this.staffInfoForm.controls['middleName'].value;   
        request.lastName = this.staffInfoForm.controls['lastName'].value;   

        request.age = this.staffInfoForm.controls['age'].value;   
        request.birthDate = this.fixDate(this.staffInfoForm.controls['birthDate'].value);
        request.birthPlace = this.staffInfoForm.controls['birthPlace'].value;   

        request.nationality = this.staffInfoForm.controls['nationality'].value;   
        request.countryOrigin = this.staffInfoForm.controls['countryOrigin'].value;   
        request.gender = this.staffInfoForm.controls['gender'].value;     


        request.phone = this.staffInfoForm.controls['phone'].value;
        request.mobileNumber = this.staffInfoForm.controls['mobileNumber'].value;

        request.passportNumber= this.staffInfoForm.controls['passportNumber'].value;
        request.passportExpiry= this.fixDate(this.staffInfoForm.controls['passportExpiry'].value);
        request.licenseNumber= this.staffInfoForm.controls['licenseNumber'].value;
        request.licenseExpiry = this.fixDate(this.staffInfoForm.controls['licenseExpiry'].value);
        
        request.maritalStatus = this.staffInfoForm.controls['maritalStatus'].value;
        request.visaType = this.staffInfoForm.controls['visaType'].value;

        request.laborCardNumber= this.staffInfoForm.controls['laborCardNumber'].value;
        request.laborCardExpiry= this.fixDate(this.staffInfoForm.controls['laborCardExpiry'].value);

        request.presentAddress = this.staffInfoForm.controls['presentAddress'].value;            
        request.permanentAddress = this.staffInfoForm.controls['permanentAddress'].value;

        
        request.homePhone= this.staffInfoForm.controls['homePhone'].value;            
        request.homeMobileNumber = this.staffInfoForm.controls['homeMobileNumber'].value;

        request.personalEmail= this.staffInfoForm.controls['personalEmail'].value;            
        request.officialEmail= this.staffInfoForm.controls['officialEmail'].value;

        //Emergency Contact Fields
        request.personName= this.staffInfoForm.controls['personName'].value;
        request.relation= this.staffInfoForm.controls['relation'].value;
        request.contactNumber = this.staffInfoForm.controls['contactNumber'].value;
        request.personEmail = this.staffInfoForm.controls['personEmail'].value;

        request.address = this.staffInfoForm.controls['address'].value;
        request.remark = this.staffInfoForm.controls['remark'].value;

        request.appointmentDate  = this.fixDate(this.staffInfoForm.controls['appointmentDate'].value);
        request.joinningDate  = this.fixDate(this.staffInfoForm.controls['joinningDate'].value);

        request.staffName = this.staffInfoForm.controls['staffName'].value;
        request.submitDate = this.fixDate(this.staffInfoForm.controls['submitDate'].value);

        request.officialName = this.staffInfoForm.controls['officialName'].value;  
        request.noteDate = this.fixDate(this.staffInfoForm.controls['noteDate'].value);

        request.remarks = this.staffInfoForm.controls['remarks'].value;  
        request.officeUse = this.staffInfoForm.controls['officeUse'].value;  

        this._loaderService.show();
        this._services.addStaff(request).subscribe(
            (response) => {
                if (response.errorMessage == null) {
                    this._loaderService.hide();
                    // this.dialogRef.close();
                    this._messageNotification.successMessage(response.successMessage);
                    this.router.navigate([
                      "/pages/projects",
                  ]);
                  
                }
            },
            (error) => {
                this._loaderService.hide();
                this._messageNotification.errorMessage(error.error.errorMessage);
            }
        );
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




}
