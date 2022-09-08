import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListKeynoteDialogComponent } from '../list-keynote-dialog/list-keynote-dialog.component';
import { RulesServicesService } from '../services/rules-services.service';

@Component({
  selector: 'app-metric-dashboard',
  templateUrl: './metric-dashboard.component.html',
  styleUrls: ['./metric-dashboard.component.scss']
})
export class MetricDashboardComponent implements OnInit {
  
  projectData=[];
  keynotesInProject = 0;
  keynotesInModel =0;
  uniqueKeynotesUsedInModel = 0;
  wrongKeynotesUsedInModel = 0;
  unusedKeynotes = 0;
  flatWrongKeynoteList: any;
  distinctWrongKeynotes: any; 
  selectedData;
  totalNumberOfStairs =0;
  stair_risers_height=0;
  projectName;
  LevelLinkedWithWalls: any;
  CreatedOn;
  doorCount=0;
  listOfValidDoorCount=0;
  listOfInValidDoorCount=0;
  ListOfInvalidDoor=0;
  ListOfvalidDoor=0;
  numberOfStairs=0;
  List_KeynotesIn_File=0;
  confirmDialogRef: MatDialogRef<ListKeynoteDialogComponent>;
  dialogRef: any;
  ListofDoorsKeynotes:any;
  List_KeynotesIn_Model;
  List_UnUsedKeynotess;
  List_ofdoors;
  List_numberOfStairs;
  MainProjectKeynotesFile:any;
  ProjectKeynotesFile:any;
  productList;
  filterdoorlist;
  constructor(
    public _rulesetService: RulesServicesService,
    // public _service: ServiceProducts,
    private _matDialog: MatDialog,
    ) { 
    }
  ngOnInit(): void {
    this.getRulesetMetricData('2742');
  }
  getRulesetMetricData(code){
    this._rulesetService.getRulesetMetrics(code).subscribe((response:any) => {
    let result = response;
    console.log(result);
    this.projectData=  response[0].keynotesDetialsNew; 
    this.ListofDoorsKeynotes = response[0].keynotesDetialsNew[0].listofDoorsKeynotes;
    this.List_KeynotesIn_File= response[0].keynotesDetialsNew[0].list_KeynotesIn_File;
    this.List_KeynotesIn_Model = response[0].keynotesDetialsNew[0].list_KeynotesIn_Model;
    console.log(this.List_KeynotesIn_Model);
    this.List_UnUsedKeynotess = response[0].keynotesDetialsNew[0].unsedKeynotes;
    this.List_ofdoors =response[0].keynotesDetialsNew[0].listOfDoors;
    this.ListOfvalidDoor=response[0].keynotesDetialsNew[0].listOfValidDoors;
    this.ListOfInvalidDoor=response[0].keynotesDetialsNew[0].listOfInvalidDoor;
    this.filterdoorlist=response[0].keynotesDetialsNew[0].filterdoorlist;
    
    this.MainProjectKeynotesFile=this.projectData.filter(x=>x.documenTitle.includes('AR-MAIN'));
    this.ProjectKeynotesFile=this.projectData;

//    this.ProjectKeynotesFile=this.projectData.filter(x=>!x.documenTitle.includes('AR-MAIN'));
    //for loop to traverse over ProjectKeynotesFile and find the KeynotesIn_Model then 
    //other then currrent do sum of all KeynotesIn_Model and then intercet 
    

    
    // this.productList=this._service.getProducts();
    // console.log(this.productList);
      // this.keynotesInProject = response[0].keynotesDetialsNew[0].keynotesIn_File;
      // this.keynotesInModel = response[0].keynotesDetialsNew[0].totalKeynotesInModel;
      // this.wrongKeynotesUsedInModel = response[0].keynotesDetialsNew[0].wrongKeynotes;
      // this.projectName=response[0].keynotesDetialsNew[0].documenTitle;
      // this.unusedKeynotes=response[0].keynotesDetialsNew[0].unUsedKeynotess;
      // this.CreatedOn=response[0].keynotesDetialsNew[0].createdOn;
      // this.doorCount=response.keynotesDetialsNew.ListOfDoorCount;
      // this.LevelLinkedWithWalls=response.keynotesDetialsNew.levelLinkedWithWalls;
      // this.listOfValidDoorCount=response.keynotesDetialsNew.ListOfValidDoorCount;
      // this.listOfInValidDoorCount=response.keynotesDetialsNew.ListOfInvalidDoorCount;
      // this.listOfInvalidDoor=response.keynotesDetialsNew.ListOfValidDoors;
      // this.listOfValidDoors=response.keynotesDetialsNew.ListOfValidDoors;
      // this.numberOfStairs=response.keynotesDetialsNew.NumberOfStairs;
      
      //this.uniqueKeynotesUsedInModel = response[0].keynotesDetialsNew[0].uniqueKeynotesIn_Model;
      // this.unusedKeynotes = response[0].unUsedKeynotess;
      // this.totalNumberOfStairs = response[0].NumberOfStairs[0].NumberOfStairs;
      // this.stair_risers_height = response[0].maxRiserHeights[0].maxRiserHeights;
      
      // this.flatWrongKeynoteList= keynoteDetails.reduce((a, {listOfWrongKeynotes}) => [...a,...listOfWrongKeynotes], []);
      // this.distinctWrongKeynotes = [...new Set(this.flatWrongKeynoteList.map(i => i.elementKeynote))];
       //this.wrongKeynotesUsedInModel = this.distinctWrongKeynotes.length;
    });
  }
  
  openDialog(param, title){
    switch(param)
    {
      case 'KeynoteModel':
        this.selectedData = this.projectData;
        console.log("KeynoteModel");
        this.selectedData = this.ListofDoorsKeynotes;
        break;
        case 'KeynotesIn_File':
        this.selectedData = this.projectData;
        console.log("KeynotesIn_File");
        this.selectedData = this.List_KeynotesIn_File;
        break;
        case 'KeynotesIn_Model':
        var currrentFile =this.projectData.filter(x=>x.documenTitle.includes(title))[0];
         this.selectedData= currrentFile.list_KeynotesIn_Model;
         break;
        case 'unsedKeynotes':
          this.selectedData = this.projectData;
          console.log("unsedKeynotes");
          this.selectedData = this.List_UnUsedKeynotess;
          break;
          case 'list_doors':
          this.selectedData = this.projectData;
          console.log("list_doors");
          this.selectedData = this.List_ofdoors;
          break;
          case 'list_validdoors':
          this.selectedData = this.projectData;
          console.log("list_validdoors");
          this.selectedData = this.ListOfvalidDoor;
          break;
          case 'list_In_validdoors':
          this.selectedData = this.projectData;
          console.log("list_In_validdoors");
          this.selectedData = this.ListOfInvalidDoor;
          break;
          case 'Filterdoorlist':
            // this.selectedData = this.projectData;
            console.log(this.filterdoorlist);
            this.selectedData = this.filterdoorlist;
            break;
    }
    this.confirmDialogRef = this._matDialog.open(ListKeynoteDialogComponent, {
      disableClose: false,
      data :{
        wrongKeynoteList: this.selectedData,
        list_KeynotesIn_File : this.selectedData,
        list_KeynotesIn_Model : this.selectedData,
        unsedKeynotes : this.selectedData,
        listOfDoors :this.selectedData,
        listOfValidDoors :this.selectedData,
        ListOfInvalidDoor : this.selectedData,
        filterdoorlist : this.selectedData

      }
    });
  }
}
