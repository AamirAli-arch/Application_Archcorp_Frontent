import { Component, ElementRef, OnInit, ViewChild ,OnDestroy,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { AddSpaceMatrixElementRequest, SpaceMatrixElements,} from '../services/matrix';
import { SpaceMatrixService } from '../services/space-matrix.service';
import { DxDataGridComponent, } from 'devextreme-angular';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { element } from 'protractor';

import * as jsPDF from "jspdf";
import { exportDataGrid } from 'devextreme/pdf_exporter';
import "jspdf-autotable";


@Component({
  selector: 'app-view-project-matrix-element',
  templateUrl: './view-project-matrix-element.component.html',
  styleUrls: ['./view-project-matrix-element.component.scss']
})
export class ViewProjectMatrixElementComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  spaceMatrixDataSource:SpaceMatrixElements[];
  addElement;
  addSpaceMatrixElement:AddSpaceMatrixElementRequest;
  project_Id:any;  
  groupedArray: any[] = [];
  //searchText: string="a";
  //expanded = true;

  levelSelected : string;
  elementSelected : string;
  floorSelected : string;
  specificSelected: string;
  disciplineSelected: string;


  //To Add Item to Dropdown
  itemCtrl: FormControl;
  filteredItems: Observable<any[]>;

  elementCtrl: FormControl;
  filteredElements: Observable<any[]>;


  showAddButton: boolean = false;
  prompt = 'Press <enter> to add "';

  elementLevels=[
    {id: '1', name: '-00.20M - 00.00M'},
    {id: '2', name: '00.00M - 02.700M'},
    {id: '3', name: '100-2700MM FROM FFL'},
    {id: '4', name: '00.10M - 02.75M'},
    {id: '5', name: '450MM FROM FFL'},
    {id: '6', name: '500MM FROM FFL'},
    {id: '7', name: '850MM FROM FFL'},
    {id: '8', name: '900MM FROM FFL'},
    {id: '9', name: '1000MM FROM FFL'},
    {id: '10', name: '1200MM FROM FFL'},
    {id: '11', name: '1500MM FROM FFL'},
    {id: '12', name: '1800MM FROM FFL'},
    {id: '13', name: '2000MM FROM FFL'},
    {id: '14', name: '2200MM FROM FFL'},
    {id: '15', name: '02.700M FROM FFL'},  
    {id: '16', name: '4.00M - 650MM'},  
  ];

  // elements =[
  //   {id: '1', name: 'Wall'},
  //   {id: '2', name: 'Roof'},
  //   {id: '3', name: 'Door'},    
  // ]

  floorLevels =[
    {id:'1',name:'Ground'},
    {id:'2',name:'Podium'},
    {id:'3',name:'Level-1'},
    {id:'4',name:'Level-2'},
    {id:'5',name:'Level-3'},
    {id:'6',name:'Level-4'},
    {id:'7',name:'Level-5'},
    {id:'8',name:'Level-6'},
    {id:'9',name:'Level-7'},
    {id:'10',name:'Level-8'},
  ];


  specifics = [
  {id:'1',name:'Color'},
  {id:'2',name:'Finish'},
  {id:'3',name:'Height'},
  ]


  disciplines =[
    {id:'1', name:'Mechanical'},
    {id:'2', name:'Electircal'},
    {id:'3', name:'Structural'},
    {id:'4', name:'Architecture'},
    {id:'5', name:'Interior'},
  ]
  
  // items: string[] = [
  //   'Wall Print',
  //   'Table Lamp',
  //   'Clock'
  // ];


  elements: string[] = ['Wall Print',
  'Table Lamp',
  'Clock','Door']

  elementsForm = new FormGroup({    
    project: new FormControl("", Validators.required),
    roomId: new FormControl("", Validators.required),
    floorLevel: new FormControl("", Validators.required),
    element: new FormControl("", Validators.required),
    level: new FormControl("", Validators.required),
    specific: new FormControl("", Validators.required),
    material: new FormControl("", Validators.required),
    brand: new FormControl("", Validators.required),    
    supplier: new FormControl("", Validators.required),
    remarks: new FormControl(''),    
    generalImpact: new FormControl("", Validators.required),    
    discipline: new FormControl("", Validators.required),    
    // discipline: new FormControl(''),
  });



  

  constructor(private _spaceMatrixService: SpaceMatrixService,
    private _messageNotification: MessageNotifierService,
    private _loaderService: LoaderSpinerService,
    
    
    ) { 
      // this.itemCtrl = new FormControl();
      // this.filteredItems = this.itemCtrl.valueChanges
      // .pipe(
      // startWith(''),
      // map(item=> item ? this.filterItems(item) : this.items.slice())
      // );
  
      

      
    }

     
    
    //spaceMatrixDataSource
  ngOnInit(): void {
    this.getSpaceMatrixElements();      
    //this.onCellHoverChanged = this.onCellHoverChanged.bind(this);
    
    //this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    //this.selectStatus = this.selectStatus.bind(this);
  }
  
  projectId(Id:any){
    this.elementsForm.controls['project'].setValue(Id[0]);
  }



  saveMatrix(){
    console.log(this.elementsForm.value)
    if(this.elementsForm.valid){
      let request = new AddSpaceMatrixElementRequest();      
      request.projectId= this.elementsForm.controls["project"].value;        
      request.roomId = this.elementsForm.controls["roomId"].value;
      request.floorLevel = this.elementsForm.controls["floorLevel"].value;
      request.element = this.elementsForm.controls["element"].value;
      request.level= this.elementsForm.controls["level"].value;
      request.specific= this.elementsForm.controls["specific"].value;
      request.material= this.elementsForm.controls["material"].value;
      request.brand= this.elementsForm.controls["brand"].value;
      request.supplier= this.elementsForm.controls["supplier"].value;
      request.remarks= this.elementsForm.controls["remarks"].value;
      request.generalImpact= this.elementsForm.controls["generalImpact"].value;
      request.discipline= this.elementsForm.controls["discipline"].value;

      
      this._loaderService.show();
      this._spaceMatrixService.addSpaceMatrixElement(request).subscribe(
        (response) => {
            if (response.errorMessage == null) {
                this._loaderService.hide();
                //this.getSpaceMatrixElements();
                this._messageNotification.successMessage(
                    response.successMessage     
                                   
                );
                this.elementsForm.reset();
                this.getSpaceMatrixElements();
                this.elementsForm.get('project').clearValidators();
                this.elementsForm.get('project').updateValueAndValidity();

                this.elementsForm.get('roomId').clearValidators();
                this.elementsForm.get('roomId').updateValueAndValidity();

                this.elementsForm.get('floorLevel').clearValidators();
                this.elementsForm.get('floorLevel').updateValueAndValidity();

                this.elementsForm.get('element').clearValidators();
                this.elementsForm.get('element').updateValueAndValidity();

                this.elementsForm.get('level').clearValidators();
                this.elementsForm.get('level').updateValueAndValidity();

                this.elementsForm.get('specific').clearValidators();
                this.elementsForm.get('specific').updateValueAndValidity();

                this.elementsForm.get('material').clearValidators();
                this.elementsForm.get('material').updateValueAndValidity();
                
                this.elementsForm.get('brand').clearValidators();
                this.elementsForm.get('brand').updateValueAndValidity();
                
                this.elementsForm.get('supplier').clearValidators();
                this.elementsForm.get('supplier').updateValueAndValidity();

                this.elementsForm.get('remarks').clearValidators();
                this.elementsForm.get('remarks').updateValueAndValidity();

                this.elementsForm.get('generalImpact').clearValidators();
                this.elementsForm.get('generalImpact').updateValueAndValidity();

                this.elementsForm.get('discipline').clearValidators();
                this.elementsForm.get('discipline').updateValueAndValidity();

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


  addNewVersion(value: string){
    this.elements.push(value);
    }

    // onExporting(e) {
    //   const doc = new jsPDF();
    //   exportDataGrid({
    //     jsPDFDocument: doc,
    //     component: e.component        
    //   }).then(() => {
    //     doc.save('SpaceMatrix.pdf');
    //   });
    // }



  // Add Item to Drop Down
  
  // filterItems(name: string) {
  //   let results = this.items.filter(item=>
  //     item.toLowerCase().indexOf(name.toLowerCase()) === 0);

  //   this.showAddButton = results.length === 0;
  //   if (this.showAddButton) {
  //     results = [this.prompt + name + '"'];
  //   }

  //   return results;
  // }

  // optionSelected(option) {
  //   if (option.value.indexOf(this.prompt) === 0) {
  //     this.addOption();
  //   }
  // }

  // addOption() {
  //   let option = this.removePromptFromOption(this.itemCtrl.value);
  //   if (!this.items.some(entry => entry === option)) {
  //     const index = this.items.push(option) - 1;
  //     this.itemCtrl.setValue(this.items[index]);
  //   }
  // }

  // removePromptFromOption(option) {
  //   if (option.startsWith(this.prompt)) {
  //     option = option.substring(this.prompt.length, option.length -1);
  //   }
  //   return option;
  // }







  //----- Collapse/Expand all

  // collapseAllClick() {
  //   this.expanded = !this.expanded;
  //   console.log('executed');
  // }


  //----- Refresh the data source

  // refreshDataGrid() {
  //   this.dataGrid.instance.refresh();
  // }

//Custom Search - Works with single column but not dynamic in nature.

//   onToolbarPreparing(e) {
//     console.log('e',e);
//     e.toolbarOptions.items.unshift({
//         location: 'after',
//         template: 'Search...'
//     }, {
//             location: 'after',
//             widget: 'dxTextBox',
//             options: {
//                 width: 200,
//                 value: '',
//                 onValueChanged: this.selectStatus.bind(this)
//             }
//         });

//       }

//   selectStatus(data) {
//     if (data.value == "") {
//         this.dataGrid.instance.clearFilter();
        
//     } else {
//         this.dataGrid.instance.filter(["floorLevel", "Contains", data.value]);
//         console.log('data', data.value);
//     }
// }


  getSpaceMatrixElements(){   
    this._spaceMatrixService.getAllSpaceMatrixElements().subscribe(spaceMatrixResponse =>{     
      this.spaceMatrixDataSource = spaceMatrixResponse.spaceMatrixElements;          
       
      // var spaceMatrixData = this.spaceMatrixDataSource;      
      // let  transposeData= spaceMatrixData.reduce(function(arr,obj){
      //   for(let key in obj)
      //   {
      //     if(obj.hasOwnProperty(key)){
      //       arr[key]= arr[key] || []
      //       arr[key].push(obj[key])
      //     }
      //   }
      //   return arr
      //  },{})               
      //  for(var i in transposeData)
      // {
      //    console.log(transposeData[i]);
       
      // }


      //const groupDiscipline = _.groupBy(this.spaceMatrixDataSource,grp=>grp.discipline);      
      //console.log('groupDiscipline',groupDiscipline)
      //var matrixData = groupBy(this.spaceMatrixDataSource, grp=>grp.discipline);
      //console.log('matrixGroup', matrixData);
     });
    }

    

    

}
   
    
