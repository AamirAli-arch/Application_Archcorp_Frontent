import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ResourceService } from "../../site-projection/service/resource.service";
import { SystemRequest } from "../model/system";
import { SystemService } from "../services/system.service";

@Component({
    selector: "app-system-add",
    templateUrl: "./system-add.component.html",
    styleUrls: ["./system-add.component.scss"],
})
export class SystemAddComponent implements OnInit {

   @ViewChild('fileUpload') fileUpload: any;
    addForm: FormGroup;
    employees: any;
    projectArray: any;
    deciplineArray: any;
    systemArray: any;
    subSystemArray: any;
    statDate: any;
    endDate: any;
    fileToUpload: any;
    imageUrl: File;
    private formData: FormData = new FormData();
    departmentArray = [{ name: "", value: "" }];
    constructor(
        private _service: ResourceService,private _messageNotification:MessageNotifierService  ,
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<SystemAddComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _systemService: SystemService,
        @Inject(MAT_DIALOG_DATA) public data : any
    ) {

    }

    ngOnInit(): void {
        this.addForm = this.fb.group({
            project: new FormControl([]),
            discipline: new FormControl([]),
            system: new FormControl(""),
            subsystem: new FormControl(""),
            textArea: new FormControl(""),
            file: new FormControl(""),
        });
     
        //get project list for drop down
        this._service.getProjectList().subscribe((response) => {
            this.projectArray = response.projects;
        });

        //get deciplineArray list for drop down
        this._systemService.getDeciplineList().subscribe((response: any) => {
            this.deciplineArray = response.disciplines;
        });
        //get System list for drop down
        this.addForm.controls["discipline"].valueChanges.subscribe(
            (response: any) => {
                const request = new SystemRequest();
                request.id = response;
                this._systemService
                    .getSystemList(request)
                    .subscribe((response) => {
                        this.systemArray= response.systems;
                    });
            }
        );
        //get Sub System list for drop down
        this.addForm.controls["system"].valueChanges.subscribe(
            (response: any) => {
                const request = new SystemRequest();
                request.id = response;
                this._systemService
                    .getSubSystemList(request)
                    .subscribe((response:any) => {
                        this.subSystemArray=response.subSystems;
                    });
            }
        );
    }

    uploadFile($event: any){
        let input = $event.target;
        const fileSizeOrg = input.files[0].size;
        const fileSizeInKB = Math.round(fileSizeOrg / 1024);
        if(fileSizeInKB < 1024){
            let reader = new FileReader();
            reader.readAsText(input.files[0]);
            this.imageUrl=input.files[0]
        } else{
            this.fileUpload.nativeElement.value = "";
            this._messageNotification.errorMessage("file size greater then 1MB is not allowed");
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


    profileEdit() {
        if(this.addForm.valid){
            this.formData= new FormData();
            this.formData.append("file", this.imageUrl);
            this.formData.append("projectId", this.data);
            this.formData.append("systemId", this.addForm.controls['system'].value);
            this.formData.append("subSystemId", this.addForm.controls['subsystem'].value);
            this.formData.append("disciplineId", this.addForm.controls['discipline'].value);
            this.formData.append("comments", this.addForm.controls['textArea'].value);
            this._loaderService.show();
            this._systemService.addSystem(this.formData).subscribe((response:any) =>{
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
            )
        }
    }
}


