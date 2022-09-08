import { Component, OnInit, ViewChild, } from '@angular/core';
import { DxDataGridComponent,} from 'devextreme-angular';
import { AddDashboardRequest, AddDisciplineRequest, AddEmployeeRequest, Dashboard, DashboardDisciplines, DeleteEmployeeRequest, UpdateDashboardGroupRequest, UpdateDashboardRequest } from '../services/dashboard'; 
import { ProjectDashboardService } from '../services/project-dashboard.service';
import { Ratings,GroupStages } from '../services/dashboard';
import { UpdateDesciplineRequest } from '../services/dashboard';
import { Router } from '@angular/router';
import { MessageNotifierService } from "app/services/message-notifier.service";
import { EmployeesRecord } from '../services/employee';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import  jsPDF  from 'jspdf';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateNoteComponent } from 'app/main/pages/project-notes/create-note/create-note.component';
import { DxDataGridModule } from 'devextreme-angular';
import 'jspdf-autotable';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { request } from 'http';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss'],
  
})
export class ViewDashboardComponent implements OnInit {
    
  getId:any=[]; 
  employeeDataSource:EmployeesRecord[];
  groupedArray: any[] = [];
  statuses: Array<number>;
  //employees: Employee[];
  draggingGroupName = 'appointmentsGroup';
  dataSource: any;
  sortOrder: string;
  
  dataSource2: any;

  
  
ratings: Ratings[] = [{
    id:1,
    name: 'NotRequired',
},
{
    id:2,
    name: 'Hold',
},
{
    id:3,
    name: 'RequiredNow',
},
{
    id:4,
    name: 'FocalPoint',
},
{
    id:5,
    name: 'Risk',

}];


groupStages: GroupStages[]=[{
    id:1,
    name:'Potential',
},
{
  id:2,
  name:'ImminentStart',
},
{
  id:3,
  name:'Underway',
},
{
  id:4,
  name:'ReviewAndConfirm',
},
{
  id:5,
  name:'Peak',
},
{
  id:6,
  name:'NearCloseOut',
}];

  dashboardDataSource:DashboardDisciplines[];
  addDashboardDataSource: Dashboard[];

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent
  constructor( private _projectDashboardService: ProjectDashboardService,  
  private router: Router,
  private _messageNotification: MessageNotifierService,
  public dialog: MatDialog,
  
  ) { 

    //this.statuses = [1, 2];
    this.cloneIconClick = this.cloneIconClick.bind(this);
    
  }

  ngOnInit(): void {  
    this.getProjectsDashboard();     
    this.getEmployees();     
    this.onReorder= this.onReorder.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.userInitials = this.userInitials.bind(this);
   
    
    //this.statuses = [1, 2];
    // this.dataSource ={
    //   emp :this.employeeDataSource,      
    //   reshapeOnPush : true,
    // };   
    
    
    //this.onEmployeeRemove = this.onEmployeeRemove.bind(this);
    //this.onEmployeeAdd = this.onEmployeeAdd.bind(this); 
    
        
  }


  
  
  getProjectsDashboard(){   
    this._projectDashboardService.getAllDashboardDisciplines().subscribe(dashboardResponse =>{      
      this.dashboardDataSource = dashboardResponse.dashboardDisciplines;                      
      console.log('ds', this.dashboardDataSource)
     });
    }
  
  selectionChanged(data: any) {
    var dataKey = Object.keys(data.newData)
    
    if(dataKey[0] =="groupStage")
    {     
      this.updateGroupStage(data)
    }    
    else 
    {
      this.updateDiscipline(data)
    }  
    
  }

  updateDiscipline(data:any){
    //update disciplines only
    let discipline =  new UpdateDesciplineRequest();
    let obj = {
      ...data.oldData,
      ...data.newData
    }
    
    discipline.id = data.key;  
    discipline.preBim = obj.preBIM;
    discipline.aor = obj.aor;
    discipline.architecture = obj.architecture;
    discipline.structure = obj.structure;
    discipline.electrical = obj.electrical;
    discipline.mechanical = obj.mechanical;
    discipline.interior = obj.interior;
    discipline.qs = obj.qs;
    
      
    
    this._projectDashboardService.updateDashboardDisciplines(discipline).subscribe(
      response => {
          if (response.errorMessage == null) {                     
              this._messageNotification.successMessage(response.successMessage);
          }
      },
      (error) => {          
          this._messageNotification.errorMessage(error.error.errorMessage);
      }
    );
  }

  updateGroupStage(data:any){
    //update group stage only
    let stage  = new UpdateDashboardRequest();
    let obj1 = {
      ...data.oldData,
      ...data.newData
    }

                                      
    stage.id= obj1.dashboardId;
    stage.groupStage= obj1.groupStage;

    
    this._projectDashboardService.updateProjectDashboard(stage).subscribe(
      response => {
          if (response.errorMessage == null) {                       
              this._messageNotification.successMessage(response.successMessage);
          }
      },
      (error) => {          
          this._messageNotification.errorMessage(error.error.errorMessage);
      }
    );
  }

  
  logEvent(data: any) {        
    this.selectionChanged(data)
  }


  //Add Employee - Dargging
  onAdd(e) {
    const toIndex = e.toIndex      
    let rows = e.component.getVisibleRows();
    let key = e.component.getKeyByRowIndex(toIndex);
    let rowIndex = e.component.getRowIndexByKey()
    let row = rows[toIndex];
    if(row.data.groups == undefined){
      row = rows[toIndex-1];            
    }    

    
    const  index = row.data.dashboardId;
    const data = e.itemData

    let employeeAdd:AddEmployeeRequest;
        
      employeeAdd= { employeeId:e.itemData.id, projectDashBoardId:row.data.dashboardId}      

      
       this._projectDashboardService.addDashboardEmployee(employeeAdd).subscribe(
        //this.getProjectsDashboard();
        (response) => {
          if (response.errorMessage == null) {
              this._messageNotification.successMessage(
                  response.successMessage
              );
              this.getProjectsDashboard();
          }
      },
      (error) => {
          this._messageNotification.errorMessage(
              error.error.errorMessage
          );
      });
                

  }


//Remove Employee - Double Clcik
removeEmp(empid, dashboardid){  
  const request = new  DeleteEmployeeRequest();  
  request.projectDashBoardId = dashboardid;
  request.employeeId = empid;
  
  this._projectDashboardService.deleteDashboardEmployee(request).subscribe(
    (response) => {
        if (response.errorMessage == null) {
            this._messageNotification.successMessage(
                response.successMessage
            );
            this.getProjectsDashboard();
        }
    },
    (error) => {
        this._messageNotification.errorMessage(
            error.error.errorMessage
        );
    }
);

}

  calculateSortValue(rowData) {
    
    if (rowData.groups == "DesignAndAuthorities")
        return "DesignAndAuthorities"
    if (rowData.groups == "Tender")
        return "Tender"
        if (rowData.groups == "Supervision")
        return "Supervision"  
    else                
        return "Unassigned"; 

        
  } 

  


  

  onItemDragStart(e) {
    e.itemData = e.fromData;        
  }

  onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;      
    }
  }

  onListDragStart(e) {
    e.cancel = true;
  }




  onReorder(e:any) {
  
    const toIndex = e.toIndex           

    let rows = e.component.getVisibleRows();    
    let key = e.component.getKeyByRowIndex(toIndex);
    let rowIndex = e.component.getRowIndexByKey()
    let row = rows[toIndex];
        

    if(row.data.groups == undefined){
      row = rows[toIndex-1];                
      
    }    

    let dashboardAdd;
    let disciplineAdd:AddDisciplineRequest;

    let dashboardUpdate;
    let updateGroup:UpdateDashboardGroupRequest;

    //From unassigned to the other existing group(DesignAndAuthorities,Tender,Supervision)
     if(e.itemData.dashboardId == 0)
     
      {        
       dashboardAdd = {projectId:e.itemData.projectId, groups: row.data.groups, groupStage: 1};          

            this._projectDashboardService.addProjectDashboard(dashboardAdd).subscribe(response=>{
                             
            disciplineAdd  = {projectDashBoardId: response.projectDashboard.id, 
              preBIM: 1,
              aor:1, 
              architecture:1,
              structure:1,
              mechanical:1,
              electrical:1,    
              interior: 1,
              qs: 1,
              
            }

            this._projectDashboardService.addProjectDiscipline(disciplineAdd).subscribe(resp => {              
              this.getProjectsDashboard();
            })
       });        
      }  

      //From one existing group to the other existing group     
      if(e.itemData.dashboardId != 0)
      {        
        dashboardUpdate = {groups: row.data.groups, id: e.itemData.dashboardId};          
            this._projectDashboardService.updateDashboardGroup(dashboardUpdate).subscribe(response=>{ 
              if (response.errorMessage == null) {                            
                  this._messageNotification.successMessage(response.successMessage);
                  this.getProjectsDashboard();
              }
            
            },
            (error) => {          
              this._messageNotification.errorMessage(error.error.errorMessage);  
       });        
        
       
    }
  }
       

  getEmployeValue(data: any) {
    this.getId = data;
    this.getEmployees();
  }

  
  getEmployees(){   
    
    const request = new EmployeesRecord();
    request.employeeIds = this.getId;    
    this._projectDashboardService.getEmployeeList(request).subscribe(employeeResponse =>{      
    this.employeeDataSource = employeeResponse.employees;  
    const data = this.employeeDataSource;             
    
    const grouped = this.groupBy(data, dat=>dat.designation);    
    this.groupedArray = Array.from(grouped).map(([name, value]) => ({name, value}))   
      
  });        
}
  

  
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
       if(item.designation != 'Software Developer' && item.designation !='IT Engineer' && item.designation !='Technologist'){  
         const key = keyGetter(item);
         const collection = map.get(key);
         
         if (!collection) {
             map.set(key, [item]);
         } else {
            
             collection.push(item);
            }
         
          }
    });
    return map;
    
 }

  applyFilter(filterText: string) {
  const filterData = this.filter(this.employeeDataSource, filterText);     

  const grouped = this.groupBy(filterData, dat=>dat.designation)  
  this.groupedArray = Array.from(grouped).map(([name, value]) => ({name, value}))   


  
  if(this.groupedArray == null)
  {
    console.log('No match found');
  }

}


filter(array, text) {
  const getNodes = (result, object) => {
      if (this.checkName(object.name, text)) {
          result.push(object);
          return result;
          
      }
      if (Array.isArray(object.names)) {
          const names = object.names.reduce(getNodes, []);
          if (names.length) result.push({ ...object, names});
          
      }
      return result;
      
  };
  
  return array.reduce(getNodes, []);
}

checkName(text, search) {
  text = text.toLocaleLowerCase();
  search = search.toLocaleLowerCase();
  if (text.indexOf(search) > -1) {
      return true;
  } else {    
      return false;
      
  }
}


addNote(projectId) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = { id: projectId };
  dialogConfig.panelClass = "createNoteComponent";
  dialogConfig.height="900px";
  dialogConfig.width="700px";
  
  const dialogRef = this.dialog.open(CreateNoteComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((data) => {
      if (data) {
          if (data.errorMessage == null) {
              this.getProjectsDashboard();
          }
      }
  });
}


cloneIconClick() {  
  //this.addNote();
}


exportGrid() {
  const doc = new jsPDF();
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: this.dataGrid.instance,
  }).then(() => {
    doc.save('ProjectDetails.pdf');
  });
}





deleteEmployee(data:any)
{

  let employee =  new DeleteEmployeeRequest();
  let obj = {
    ...data.oldData,
    ...data.newData
  }
  
  employee.projectDashBoardId = obj.projectDashBoardId;  
  employee.employeeId =obj.employeeId
  
  
    
  
  this._projectDashboardService.deleteDashboardEmployee(employee).subscribe(
    response => {
        if (response.errorMessage == null) {                     
            this._messageNotification.successMessage(response.successMessage);
        }
    },
    (error) => {          
        this._messageNotification.errorMessage(error.error.errorMessage);
    }
  );

}

userInitials(name: string){
  return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
}


}







