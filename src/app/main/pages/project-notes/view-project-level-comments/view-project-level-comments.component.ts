import { Component, OnInit,NgModule, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  Observable} from 'rxjs';
import { FormGroup, FormBuilder, FormControl} from "@angular/forms";
import { ProjectLevelComments,GetProjectLevelCommentsRequest,CommentData, LevelComment, commentsCount,} from '../services/projectLevels';
import { NotesServicesService } from '../services/notes-services.service';
import { DxDataGridComponent,} from 'devextreme-angular';
import { GetBriefRequest } from '../services/riskNotes';
import { MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { count } from 'console';
import { el } from 'date-fns/locale';
import { colorSets } from '@swimlane/ngx-charts';
//export class TypeData {
  //Type: string;
  //Levels: LevelData[];
//}

//export class LevelData {
  //Level: string;
  //LevelComment: string;
  // level:string;
  // commments:string;
//}

@Component({
  selector: 'app-view-project-level-comments',
  templateUrl: './view-project-level-comments.component.html',
  styleUrls: ['./view-project-level-comments.component.scss']
})
export class ViewProjectLevelCommentsComponent implements OnInit {
  dataSource=[];
  comments: ProjectLevelComments[];

  buildingStories: any = [];  
  filterForm: FormGroup
  filteredAndPaged: Observable<ProjectLevelComments[]>;
  collapsed = false;
  dataSource2:CommentData[];
  commentCount:number; 
  

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent

  contentReady = (e) => {
    if (!this.collapsed) {
      this.collapsed = true;         
    }
  };

  customizeTooltip = (pointsInfo) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });


  constructor(
    private fb: FormBuilder,
    private _NotesService: NotesServicesService,
  ) { }

  ngOnInit(): void {
    this.viewProjectLevelComments();
    
    let request = new GetBriefRequest();
    request.projectId = 57;    
    
    this._NotesService.getProjectBriefing(request).subscribe(response =>{   
      let noOfStorie  =  response.projectBriefs[0].noOfStories;
      this.extractStories(noOfStorie)             
    });          
  }

  extractStories(noOfStorie){
    let storiesArray = noOfStorie.split('+');
    
    storiesArray.forEach(element => {
      var storiesNumber = element.match(/\d+/)[0];        
      var storiesName = element.replace( /^\d+/, '');
      
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
       
    
    // let stories = this.buildingStories;    
    // stories.forEach(element => {
    //  this.dataGrid.instance.addColumn(element)           
    // });    
  
      var commentArray: CommentData[]=[];    
      
      this.buildingStories.forEach(element1 => {      
         var object : CommentData = {
           level : element1,
           comments : [],           
         };
        
         var levelCommentArray: LevelComment[] = [];         
         this.dataSource.forEach(element2 => {            
          if(element2.level == element1)
            {
           var object2 : LevelComment={              
              type: element2.type,
              issue: element2.issue                        
            };
            
            levelCommentArray.push(object2);           
           }                                       
            
           });         
           
           object.comments = levelCommentArray;                                             
           commentArray.push(object);                     
          

           //--------level comment count starts  here------------
           //var commentCountArray:commentsCount[]=[]; 
            let commentCount; 
            commentArray.forEach(element3=>{
            if(element3.level == element1)
            {
              // var object3:commentsCount={
              // count:element3.comments.length
              commentCount= element3.comments.length;
            };
              
              //commentCountArray.push(object3);
              //console.log('counts',element1, object3);

              //commentCount = countAtLevels;
              console.log('commentCount',element1, commentCount);
              
              
              //commentCount = object3.count;
               //console.log('commentCount ',commentCount );
            //}
              
           });
           //--------level comment count finishes here------------
        });        
        
        this.dataSource2 = commentArray;        
        console.log('CommentArray', JSON.stringify(commentArray));

        // let commentCount : commentsCount                
        // commentArray.forEach(element => {        
        //   let atLevel = element.level;
        //   const levelTest = 'Ground 1'

        //   if(atLevel == levelTest)
        //   {
            
        //     console.log('commets', element.comments.length)
        //   }
        //   console.log('atLevel', atLevel);

        // });        
   }




  viewProjectLevelComments() {
    let request = new GetProjectLevelCommentsRequest();
    this._NotesService.getProjectLevelComments(request).subscribe(response => {
      this.dataSource = response.projectLevelComments;            
  });
  
  }
}
     

