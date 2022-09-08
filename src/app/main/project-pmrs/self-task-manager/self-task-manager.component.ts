import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";


@Component({
  selector: 'app-self-task-manager',
  templateUrl: './self-task-manager.component.html',
  styleUrls: ['./self-task-manager.component.scss']
})
export class SelfTaskManagerComponent implements OnInit {

  taskForm: FormGroup;
  
  stageSelected: string;
  projectSelected : string;

  constructor( private fb: FormBuilder) { }
  
  stages = [
    {id:'1',name:'Enquiry'},
    {id:'2',name:'Proposal'},
    {id:'3',name:'Preconcept Stage'},
    {id:'4',name:'Concept Design'},
    {id:'5',name:'Concept Design'},    
    ]

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

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      projectName: new FormControl(""),
      stage: new FormControl(""),
      
  });
  }

}


