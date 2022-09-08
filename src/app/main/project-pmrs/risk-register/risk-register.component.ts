import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl,FormGroup, FormBuilder, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';


export interface GetAllProjectRisks{
  riskId:number;
  projectId:number;
  projectName:string;
  perspectiveRisk: string;
  riskType:string;
  description:string;
  registeredDate: string;
  registeredBy: string;
  category: string;
  type: string;
  probability:string;
  cause: string;
  actions: string;  
}  


const Project_Risks:GetAllProjectRisks[] = [
  {riskId: 1,projectId:1,projectName:'Sharjah Coop', perspectiveRisk:'',riskType:'',description:'',registeredDate:new Date().toLocaleDateString().toString(),registeredBy:'Aaron Agnelo	Agnelo	DSouza',
  category:'',type:'Project Planned Tasks',probability:'',cause:'',actions:'',},
  {riskId: 2,projectId:2,projectName:'Kurdistan Gas Pipeline Network Development', perspectiveRisk:'',riskType:'',description:'',registeredDate:new Date().toLocaleDateString().toString(),registeredBy:'Malik',
  category:'',type:'Submission',probability:'',cause:'',actions:'',} , 
  {riskId: 3,projectId:3,projectName:'Kurdistan Gas Pipeline Network Development', perspectiveRisk:'',riskType:'',description:'',registeredDate:new Date().toLocaleDateString().toString(),registeredBy:'Ameer Mustafa',
  category:'',type:'Planning',probability:'',cause:'',actions:'',}  
]


@Component({
  selector: 'app-risk-register',
  templateUrl: './risk-register.component.html',
  styleUrls: ['./risk-register.component.scss']
})
export class RiskRegisterComponent implements OnInit {

  projectSelected : string;
  badgeContent :string;
  displayedColumns: string[] = ['projectName', 'perspectiveRisk', 'riskType', 'description','registeredDate','registeredBy','category','type',
  'probability','cause','action'];

  dataSource =new MatTableDataSource(Project_Risks);
  riskRegisterForm: FormGroup;
  projects =[
    {id:'1',name:'Sharjah Coop'},
    {id:'2',name:'Kurdistan Gas Pipeline Network Development'},
    {id:'3',name:'HE ASAD Modification 318, E25 Al Nahyan, Abu Dhabi'},
    {id:'4',name:'G+8 Residential Building at DSO '},
    {id:'5',name:'Al Maimoon Majlis Al Dhaid'},    
    {id:'6',name:'AGMC BMW Showroom Nad Al Hamar'},    
    {id:'7',name:'Village Villa'},    
    {id:'8',name:'Abu Dhabi Existing Villa'},  
    {id:'9',name:'Al Dhaid Mosque - Sharjah'},  
    {id:'10', name:'AGMC BMW Showroom Sharjah'}
  ]  

  constructor(private fb: FormBuilder) { 
    this.badgeContent ='A'
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.riskRegisterForm = this.fb.group({
      projectName: new FormControl(""),      
      
  });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  
  }

  filterByProject(filterString: string){
    this.dataSource.filter = filterString.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}
