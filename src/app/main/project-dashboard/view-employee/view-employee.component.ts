import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ProjectDashboardService } from '../services/project-dashboard.service';
import { Router } from '@angular/router';
import { MessageNotifierService } from "app/services/message-notifier.service";
import {  EmployeesRecord,EmployeResponse } from '../services/employee';
import { DxDataGridComponent } from 'devextreme-angular';
import { FormBuilder, FormGroup } from '@angular/forms';



import { DashboardDisciplines } from '../services/dashboard'; 
import { Ratings } from '../services/dashboard';
import { UpdateDesciplineRequest } from '../services/dashboard';




@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  
})


export class ViewEmployeeComponent implements OnInit {
  
  filterForm: FormGroup;
  getId:any=[];  
  dataSource: any;
  draggingGroupName = 'appointmentsGroup';    
  employeeDataSource:EmployeesRecord[];
  groupedArray: any[] = [];
  statuses: Array<number>;


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


dashboardDataSource:DashboardDisciplines[];

@ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent    
  constructor(private _projectDashboardService: ProjectDashboardService,
  private fb: FormBuilder,
  private router: Router,
  private _messageNotification: MessageNotifierService,
  ) 
   
   {}
    
  ngOnInit(): void {
    this.getProjectsDashboard(); 
    this.getEmployees(); 
    // this.onEmployeeRemove = this.onEmployeeRemove.bind(this);
    // this.onEmployeeAdd = this.onEmployeeAdd.bind(this);     
    this.onAdd = this.onAdd.bind(this); 
    
    //this.onAdd = this.onAdd.bind();
    // this.statuses = [1, 2];
    // this.employees = this.apps.getAllEmployee();
    // console.log('employees', this.employees)
    // this.dataSource ={
    //   emp :this.employeeDataSource,      
    //   reshapeOnPush : true,
    // };
    // console.log('ds',this.dataSource)
   
  }

  getProjectsDashboard(){   
    this._projectDashboardService.getAllDashboardDisciplines().subscribe(dashboardResponse =>{      
      this.dashboardDataSource = dashboardResponse.dashboardDisciplines;          
  });    
  }

  selectionChanged(data: any) {
    //this.selectedItemKeys = data.selectedRowKeys;                
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
      //discipline.groupStage = obj.groupStage;

      this._projectDashboardService.updateDashboardDisciplines(discipline).subscribe(
        response => {
            if (response.errorMessage == null) {
              console.log(response.errorMessage)              
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


  // onEmployeeRemove(e) {
  //   const index = this.employees.indexOf(e.itemData);

  //   if (index >= 0) {
  //     this.employees.splice(index, 1);
  //     this.employeeDataSource.push(e.itemData);
  //   }
  // }

  // onEmployeeAdd(e) {
  //   const index = this.employeeDataSource.indexOf(e.fromData);

  //   if (index >= 0) {
  //     this.employeeDataSource.splice(index, 1);
  //     this.employees.push(e.itemData);
  //   }
  // }

  
  onListDragStart(e) {
    e.cancel = true;
  }

  onItemDragStart(e) {
    e.itemData = e.fromData;
  }

  onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;      
    }
  }



  onAdd(e) {
    // const key = e.itemData.ID;
    // const values = { Status: e.toData };

    // this.dataSource.update(key, values).then(() => {
    //   this.dataSource.push([{
    //     type: 'update', key, data: values,
    //   }]);
    // });
    console.log('e',e)
  }

  onReorder(e){
    console.log("redorder",e)
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
    const grouped = this.groupBy(data, dat=>dat.designation)

    this.groupedArray = Array.from(grouped).map(([name, value]) => ({name, value}))    
    
  });    
  }
  


  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
 

}
