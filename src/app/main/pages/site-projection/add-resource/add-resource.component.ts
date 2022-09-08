import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ReportsService } from "../../reports/services/reports.service";
import { ResourceRequest } from "../models/resource-request";
import { ResourceService } from "../service/resource.service";

@Component({
    selector: "app-add-resource",
    templateUrl: "./add-resource.component.html",
    styleUrls: ["./add-resource.component.scss"],
})
export class AddResourceComponent implements OnInit {
    addForm: FormGroup;
    employees: any;
    projectArray: any;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    project_Id:any;
    tempResources:any=[];
    showContract=0;
    employeeId: any;
    constructor(
        private _service: ResourceService,private _messageNotification:MessageNotifierService  ,
        private _loaderService: LoaderSpinerService,
        private _reportsService: ReportsService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddResourceComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {


    }

    ngOnInit(): void {
        this.addForm = this.fb.group({
            project: new FormControl([]),
            resource: new FormControl([]),
            contract: new FormControl(""),
            startDate: new FormControl(""),
            endDate: new FormControl(""),
            planned: new FormControl(""),
        });

        //get resource list for drop down
        this._reportsService.getEmployees().subscribe((response) => {
            this.employees = response.employees;
        });
        //get project list for drop down
        this._service.getProjectList().subscribe((response) => {
            this.projectArray = response.projects;
        });

        this.addForm.controls["resource"].valueChanges.subscribe((employee:any) =>{
            if(employee){
                this.tempResources=[];
                if(employee.length>0){
                this.employees.forEach((element) => {
                    employee.forEach((employeeId) => {
                        if (element.id == employeeId) {
                            this.tempResources.push({
                                name: element.name,
                                resourceId: element.id,
                                contracted:0,
                                planned:0
                            });
                        }
                    });
                });
            } else{
                this.showContract=0;
                this.addForm.controls["contract"].setValue("");
                this.addForm.controls["planned"].setValue("");
            }
            }
        })

    }

    AllocateTime(resource){
        //console.log('id', id)
        this.showContract=resource.resourceId;
        // this.addForm.controls["contract"].setValue("");
        // this.addForm.controls["planned"].setValue("");
    }

    projectId(Id:any){
        this.project_Id=Id;
    }
    addResource(){
        this.tempResources.forEach((element,i) => {
            if(this.showContract==element.resourceId){
                this.tempResources[i].contracted=this.addForm.get('contract').value;
                this.tempResources[i].planned=this.addForm.get('planned').value
            }
        });
    }
    onSubmit() {

        let getvalue = this.tempResources.some(obj => obj.contracted===0);
        if(this.addForm.valid && this.project_Id){
            if(!getvalue){
            const request = new ResourceRequest();
            request.projects=this.project_Id;
            request.resources = this.tempResources;
            request.start = this.fixDate(this.addForm.controls['startDate'].value);
            request.end = this.fixDate(this.addForm.controls['endDate'].value);
            this._loaderService.show();
            this._service.addResource(request).subscribe(
                (response) => {
                    this._loaderService.hide();
                    this._messageNotification.successMessage(response.successMessage);
                    this.dialogRef.close(response);
                },
                (error) => {
                    this._loaderService.hide();
                    this._messageNotification.errorMessage(error.error.errorMessage);
                }
            );
            } else{
                this._messageNotification.errorMessage("Contracted and Planned value should be added in selected resource ");
            }
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
    // Allow enter only number value
    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
