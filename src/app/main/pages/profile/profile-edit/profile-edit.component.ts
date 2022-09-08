import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../services/profile.service';
import { departments, designations } from './../models/profile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  allocationForm: FormGroup;
  statDate: any;
  endDate: any;
  fileToUpload: any;
  imageUrl: any;
  departmentList:any;
  designationList:any;
  constructor(private fb: FormBuilder, private _service:ProfileService, private dialogRef: MatDialogRef<ProfileEditComponent>, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.allocationForm = this.fb.group({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        brithDate: new FormControl(''),
        gender: new FormControl(1),
        address: new FormControl(''),
        state: new FormControl(''),
        country: new FormControl(''),
        pincode: new FormControl(''),
        mobile: new FormControl(''),
        department: new FormControl(''),
        designation : new FormControl(''),
        reportsto: new FormControl(''),
      })

      // get department list
      this._service.getDepartment().subscribe((response:any) =>{
          if(response){
            this.departmentList=response.departments
          }
      })
        // get designations list
      this.allocationForm.get('department').valueChanges.subscribe((departmentId:any) =>{
          if(departmentId){
            const request = new designations();
               request.id=departmentId;
              this._service.designationsByDepartmentId(request).subscribe((response:any) =>{
                this.designationList= response.designations
              })
          }
      })

  }

  imageUpload(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  profileEdit(){

  }

}
