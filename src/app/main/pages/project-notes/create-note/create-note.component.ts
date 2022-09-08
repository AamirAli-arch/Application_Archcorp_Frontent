import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectClient, SimpleProjectDto } from 'app/main/charts/chart/services/ApiServices';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { from } from 'rxjs';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { NotesServicesService } from '../services/notes-services.service';
import { CreateNoteRequest } from '../services/riskNotes';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  getEmployee: any = [];
  getEmployeeCC: any = [];
  empPlaceholderTo = "To:"
  empPlaceholderCc = "Cc:"
  showProject = true;
  projects: SimpleProjectDto[];
  project_Id:any;
    projectNotesForms = new FormGroup({
    project: new FormControl(''),
    stage: new FormControl(''),
    noteType: new FormControl(''),
    priority: new FormControl(''),
    implications: new FormControl(''),
    riskProfile: new FormControl(''),
    note: new FormControl(''),
    dDate: new FormControl(''),
    employee : new FormControl(''),
    employeeCC: new FormControl('')
  });

  constructor(
    private _projectClient: ProjectClient, 
    private _service: NotesServicesService,
    private _loaderService: LoaderSpinerService,
    private _messageNotification: MessageNotifierService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    console.log("open create note", this.data)
    if(this.data != null){
      this.showProject = false;
      this.projectNotesForms.controls['project'].setValue(this.data.id);
    }
  }

  projectId(Id:any){
    this.projectNotesForms.controls['project'].setValue(Id[0]);
  }


  employeeId(Id:any)
  {
    this.projectNotesForms.controls['employee'].setValue(Id[0]);
  }

  getEmployeValue(data: any) {
    this.getEmployee = data;
  }

  getEmployeValueCC(data: any) {
    this.getEmployeeCC = data;
  }

  saveNote(){
    console.log(this.projectNotesForms.value)
    if(this.projectNotesForms.valid){
      let request = new CreateNoteRequest();
      request.projectId = this.projectNotesForms.controls["project"].value;
      request.stageId = this.projectNotesForms.controls["stage"].value;
      request.noteType = this.projectNotesForms.controls["noteType"].value;
      request.priority = this.projectNotesForms.controls['priority'].value;
      request.implication = this.projectNotesForms.controls["implications"].value;
      request.riskProfile = this.projectNotesForms.controls["riskProfile"].value;
      request.note = this.projectNotesForms.controls["note"].value;
      request.dueDate = this.projectNotesForms.controls["dDate"].value;
      request.notesResources = this.getEmployee;
      request.notesResourcesCC = this.getEmployeeCC;
      
      this._loaderService.show();
      this._service.addNote(request).subscribe(
        (response) => {
            if (response.errorMessage == null) {
                this._loaderService.hide();
                this._messageNotification.successMessage(
                    response.successMessage
                );
                this.projectNotesForms.reset();
                this.projectNotesForms.markAsPristine();
            }
        },
        (error) => {
            this._loaderService.hide();
            this._messageNotification.errorMessage(
                error.error.errorMessage
            );
        }
      );
    }
  }
}