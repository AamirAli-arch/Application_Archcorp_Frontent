
import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";




export class SelfTask {
  
  projectName: string;
  stage:string;
  workType:string;
  tdate: string;
  minutes: string;
  hours:string;
  timeOffCompensation:string;
  description:string;
}


@Component({
  selector: 'app-add-self-allocated-task',
  templateUrl: './add-self-allocated-task.component.html',
  styleUrls: ['./add-self-allocated-task.component.scss']
})
export class AddSelfAllocatedTaskComponent implements OnInit {

  projectSelected: string;
  stageSelected: string;
  workTypeSelected: string;
  minsuteSelcted: string;

  selfAllocationTaskForm: FormGroup;
  statDate: any;
  endDate: any;
  date = new Date().toLocaleDateString().toString();
  minDate = new Date(2022, 0, 1);
  
    projectList =[
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
    ];  
    stageList=[
      {id:'1',name:'Concept Design'},
      {id:'2',name:'Detail Design'},
      {id:'3',name:'Preconcept Stage'},
      {id:'4',name:'Schematic Design'},    
      {id:'5',name:'Technical Deisgn'},    
      {id:'6',name:'Tender Documents and Tender process'},          
    ]

    workTypeList=[
      {id:'1',name:'Client Meeting'},
      {id:'2',name:'Technical Discussion'},
      {id:'3',name:'Discussion & Meeting(Internal)'},
      {id:'4',name:'Semainar'},    
      {id:'5',name:'Technical Production'},    
      {id:'6',name:'Coordination and Management'},
      {id:'7',name:'Technical Review/Audit'},
      {id:'8',name:'Project Plan/Manage'},
      {id:'9',name:'Variation Preparation'},
      {id:'10',name:'Variation Review'},
      {id:'11',name:'Official Work(outside meetings)'},
      {id:'12',name:'Design Coordination Meeting'},
      {id:'13',name:'Site Meeting'},
      {id:'14',name:'Site Coordination'},
      {id:'15',name:'Client Meeting'},
      {id:'16',name:'Document Control'},
      {id:'17',name:'Site Progress Meeting'},
      {id:'18',name:'Site Work Inspection'},
      {id:'19',name:'Site Technical Review'},
      {id:'20',name:'Site Client Meeting'},
      {id:'21',name:'Site Project Management'}

    ]

 minuteList=[
      {id:'1',name:'0'},
      {id:'2',name:'15'},
      {id:'3',name:'30'},
      {id:'4',name:'45'},          
    ]

    timeCompensationList=[
      {id:'1',name:'15'},
      {id:'2',name:'30'},
      {id:'3',name:'45'},
      {id:'4',name:'1 Hour'},
      {id:'5',name:'1 Hr:15 Minutes'},          
      {id:'6',name:'1 Hr:30 Minutes'},          
      {id:'7',name:'1 Hr:45 Minutes'},          
      {id:'8',name:'2 Hr'},          
      {id:'9',name:'2 Hr:15 Minutes'},          
      {id:'10',name:'2 Hr:30 Minutes'},          
      {id:'11',name:'2 Hr:45 Minutes'},          
      {id:'12',name:'3 Hr'},          
    ]
   



    

  constructor(
    private fb: FormBuilder,private _messageNotification:MessageNotifierService,
        private dialogRef: MatDialogRef<AddSelfAllocatedTaskComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _loaderService: LoaderSpinerService,
  ) { }

  ngOnInit(): void {

    this.selfAllocationTaskForm = this.fb.group(
      {
          projectName: ["", Validators.required],     
          stage:[""],
          workType:["", Validators.required],
          taskDate:["", Validators.required],
          hours:["", Validators.required],
          minutes:["", Validators.required],
          timeOffCompensation:[""],
          description:["",Validators.required, Validators.maxLength(100)],
      }      
      );

  }

  onSubmit() {
    console.log("onsubmit",this.selfAllocationTaskForm)
    if (this.selfAllocationTaskForm.valid) {
        let request = new SelfTask();

        request.projectName = this.selfAllocationTaskForm.controls['projectName'].value;   
        request.stage = this.selfAllocationTaskForm.controls['stage'].value;
        request.workType = this.selfAllocationTaskForm.controls['workType'].value;

        request.tdate =this.fixDate(this.selfAllocationTaskForm.controls['tdate'].value);
        request.hours= this.selfAllocationTaskForm.controls['hours'].value;
        request.minutes= this.selfAllocationTaskForm.controls['minutes'].value;      
        request.timeOffCompensation= this.selfAllocationTaskForm.controls['timeOffCompensation'].value;  

        request.description = this.selfAllocationTaskForm.controls['description'].value;
         
        this._loaderService.show();
        // this._services.employeeRegister(request).subscribe(
        //     (response) => {
        //         if (response.errorMessage == null) {
        //             this._loaderService.hide();
        //             this.dialogRef.close();
        //             this._messageNotification.successMessage(response.successMessage);
        //         }
        //     },
        //     (error) => {
        //         this._loaderService.hide();
        //         this._messageNotification.errorMessage(error.error.errorMessage);
        //     }
        // );
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
}
