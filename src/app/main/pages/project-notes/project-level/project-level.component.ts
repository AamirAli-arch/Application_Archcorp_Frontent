import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { ProjectClient, SimpleProjectDto } from 'app/main/charts/chart/services/ApiServices';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { NotesServicesService } from '../services/notes-services.service';
import { CreateProjectLevelRequest } from '../services/projectLevels';
import { GetBriefRequest } from '../services/riskNotes';


@Component({
  selector: 'app-project-level',
  templateUrl: './project-level.component.html',
  styleUrls: ['./project-level.component.scss']
})
export class ProjectLevelComponent implements OnInit {
  buildingStories: string[] = [];
  projects:SimpleProjectDto[];
  projId: 1;
  project_Id:any;
  projectLevelsForms= new FormGroup({
    project: new FormControl(''),
    issue: new FormControl(''),
    level: new FormControl(''),
    type: new FormControl(''),    
  });

  constructor(private _projectClient: ProjectClient, 
    private _service: NotesServicesService,
    private _loaderService: LoaderSpinerService,
    private _messageNotification: MessageNotifierService,
        ) {       
    }
    
    
   ngOnInit(): void {
     
    }
  
    projectId(Id:any){
      this.projectLevelsForms.controls['project'].setValue(Id[0]);      
      let request = new GetBriefRequest();
      request.projectId = this.projectLevelsForms.controls['project'].value    
      
      this._service.getProjectBriefing(request).subscribe(response =>{   
        let noOfStorie  =  response.projectBriefs[0].noOfStories;
        this.extractStories(noOfStorie)
           //console.log('stories',noOfStorie);
      });
      

      this._service.getProjectLevelComments(request).subscribe(response=>{
        console.log('comments',JSON.stringify(response));
      })
    }


    
    extractStories(noOfStorie){
      let storiesArray = noOfStorie.split('+');
      // console.log('storiesArray',storiesArray);
      storiesArray.forEach(element => {
        var storiesNumber = element.match(/\d+/)[0];        
        var storiesName = element.replace( /^\d+/, '');
        // console.log('storiesNumber', storiesNumber)
        // console.log('storiesName', storiesName)
        
        switch(storiesName){
          case 'B':
            for(var i=1;i <= storiesNumber; i++){
              this.buildingStories.push("Basement " + i);
            }
            break;
            case 'G':
            for(var i=1;i <= storiesNumber; i++){
              this.buildingStories.push("Ground " + i);
            }
            break;
            case 'F':
            for(var i=1;i <= storiesNumber; i++){
              this.buildingStories.push("Floor " + i);
            }
            break;
            case 'R':
            for(var i=1;i <= storiesNumber; i++){
              this.buildingStories.push("Roof " + i);
            }
            break;
            case 'P':
            for(var i=1;i <= storiesNumber; i++){
              this.buildingStories.push("Podium " + i);
            }
            break;
        }
      });

      // console.log(this.buildingStories)
      
    }

    saveLevel(){      
      if(this.projectLevelsForms.valid){
        let request = new CreateProjectLevelRequest();
        request.projectId = this.projectLevelsForms.controls["project"].value;
        request.issue= this.projectLevelsForms.controls["issue"].value;
        request.level = this.projectLevelsForms.controls["level"].value;
        request.type = this.projectLevelsForms.controls["type"].value;
        
        this._loaderService.show();
        this._service.createLevel(request).subscribe(
          (response) => {
            console.log('response',response);
              if (response.errorMessage == null) {
                  this._loaderService.hide();
                  this._messageNotification.successMessage(
                      response.successMessage
                  );
                  this.projectLevelsForms.reset();
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