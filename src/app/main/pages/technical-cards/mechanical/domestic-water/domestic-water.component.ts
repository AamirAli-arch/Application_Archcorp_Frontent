import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowNode } from 'ag-grid-community';
import { FullwidthRendererComponent } from '../fullwidth-renderer/fullwidth-renderer.component';
import { RendererComponent } from '../renderer/renderer.component';

@Component({
  selector: 'app-domestic-water',
  templateUrl: './domestic-water.component.html',
  styleUrls: ['./domestic-water.component.scss']
})
export class DomesticWaterComponent implements OnInit {
  filterForm: FormGroup;
  gridApi: any;
  gridColumnApi: any;
  pinnedBottomRowData;
  rowData: [];
  frameworkComponents: any;


  @ViewChild('agGrid') agGrid!: AgGridAngular;
  constructor(
    private fb: FormBuilder,
  ) {
    this.frameworkComponents = {
      RendererComponent: RendererComponent,
      FullWidthRendererComponent: FullwidthRendererComponent
    }
  }

  spaces = [
    { id: 1, name: '1 Bedroom', storagePerPerson: 50, storagePerApt: 100, occupancy: 2},
    { id: 2, name: '2 Bedroom', storagePerPerson: 50, storagePerApt: 200, occupancy: 4},
    { id: 3, name: '3 Bedroom', storagePerPerson: 50, storagePerApt: 300, occupancy: 6},
    { id: 4, name: '4 Bedroom', storagePerPerson: 50, storagePerApt: 400, occupancy: 8},
    { id: 5, name: '5 Bedroom', storagePerPerson: 50, storagePerApt: 500, occupancy: 10},
    { id: 6, name: '6 Bedroom', storagePerPerson: 50, storagePerApt: 600, occupancy: 12},
    { id: 7, name: '7 Bedroom', storagePerPerson: 50, storagePerApt: 700, occupancy: 14},
    { id: 8, name: 'Retail', storagePerPerson: 20, storagePerApt: 240, occupancy: 12},
    { id: 9, name: 'Gym', storagePerPerson: 25, storagePerApt: 200, occupancy: 8},
    { id: 10, name: 'Plant Room', storagePerPerson: 100, storagePerApt: 200, occupancy: 0},
    { id: 11, name: 'Garbage Room', storagePerPerson: 100, storagePerApt: 200, occupancy: 0},
    { id: 12, name: 'BIB Taps', storagePerPerson: 25, storagePerApt: 250, occupancy: 0},
    { id: 13, name: 'Swimming Pool', storagePerPerson: 25, storagePerApt: 250, occupancy: 0},
  ];

  columnDefs: ColDef[] = [
    { field: 'spaces' },
    { field: 'quantity', editable: true },
    { field: 'persons' },
    { field: 'storagePerPerson'},
    { field: 'storagePerSpace'},
    { field: 'totalStorage', 
      valueGetter: function(params){
        if(params.node.rowPinned){
          return params.data.totalStorage;
        }
        return params.data.quantity * params.data.storagePerSpace
      }
    },
    { field: 'population', 
      valueGetter:  function(params){
        if(params.node.rowPinned){
          return params.data.population;
        }
        return params.data.quantity * params.data.persons
      },
    }
  ];



  ngOnInit(): void {
    this.filterForm = this.fb.group({
      space: new FormControl(),
      quantity: new FormControl(),
  });
  }

  cellValueUpdate(){
    console.log("updated")
  }

  onSubmit() {
    var gridApi = this.agGrid.api;
    const space = this.filterForm.get("space").value;
    const quantity = this.filterForm.get("quantity").value;
    const storagePerPerson = this.spaces.find(obj => obj.name == space).storagePerPerson;
    const storagePerApt = this.spaces.find(obj => obj.name == space).storagePerApt;
    const occupancy = this.spaces.find(obj => obj.name == space).occupancy;
    const totalStorage = quantity * storagePerApt;
    const totalPopulation = quantity * occupancy;
    var transaction = {
      add: [{ spaces: space, quantity : quantity, persons: occupancy, storagePerPerson:storagePerPerson, storagePerSpace: storagePerApt, totalStorage: totalStorage, population: totalPopulation }]
    };
    gridApi.applyTransaction(transaction);
    setTimeout(()=>{
      let pinnedBottomData = this.generatePinnedBottomData();
      let pinnedLiterData = this.calculateLiters(pinnedBottomData);
      let pinnedGallonData = this.calculateGallons(pinnedBottomData)
      let fireFighting = this.addFireFighting(pinnedBottomData);
      let bottomData = [pinnedBottomData];
      bottomData.push(pinnedLiterData);
      bottomData.push(pinnedGallonData);
      bottomData.push(...fireFighting);
      gridApi.setPinnedBottomRowData(bottomData);
    }, 100)
  }

  generateLiterBottomData(data) {
    data.totalStorage = data.totalStorage * 4.5 + " Imp Gallons";
    return data;
  }

  calculateLiters(data) {
    var result = {spaces: 'Total in Liters', totalStorage: data.totalStorage * 4.5 + " Liters"};
    return result;
  }

  calculateGallons(data) {
    var result = {spaces: 'Proposed Total Storage In US Gallons', totalStorage: data.totalStorage * 1.2 + " US Gallons"};
    return result;
  }


  addFireFighting(data){
    var totalTankLiters = data.totalStorage * 4.5;
    var result = [];
    var flowValue = 750;
    var timeValue = 60;
    var flow = {spaces: 'Flow', totalStorage: flowValue + " USGPM"};
    var time = {spaces: 'Storage required for', totalStorage: timeValue + " minutes"};
    var total = {spaces: 'Total Storage', totalStorage: flowValue * timeValue + " USGPM"};
    var grandTotal = {totalStorage: (flowValue * timeValue) * 3.785 + " liters"}
    var tankTotal = { spaces: 'Under Ground Water tank Storage', totalStorage:((flowValue * timeValue) * 3.785) + totalTankLiters + " liters" }
    var tankSize = { spaces: 'Tank Size', totalStorage:(((flowValue * timeValue) * 3.785) + totalTankLiters) / 1000 + " m3" }
    result.push(flow)
    result.push(time);
    result.push(total);
    result.push(grandTotal);
    result.push(tankTotal);
    result.push(tankSize);

    return result;
  }

  
  generatePinnedBottomData(){
    // generate a row-data with null values
    let result = {};

    this.gridColumnApi.getAllGridColumns().forEach(item => {
        result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any){
    var gridApi = this.agGrid.api;
    //**list of columns fo aggregation**
    let columnsWithAggregation = ['totalStorage', 'population']
    columnsWithAggregation.forEach(element => {
        gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
          
            if (rowNode.data[element])
                target[element] += Number(rowNode.data[element].toFixed(2));
        });
        if (target[element])
            target[element] = target[element];
    })
    target['spaces'] = 'Total';
    console.log("target", target)
    return target;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


}
