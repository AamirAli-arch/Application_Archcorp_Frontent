import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AccBimService, ApartmentAreas } from '../services/acc-bim.service';
import { DxTreeMapModule } from 'devextreme-angular';
import dxTreeMap from 'devextreme/viz/tree_map';
import { forEach, result } from 'lodash';
import { element } from 'protractor';
import { BarLabelComponent } from '@swimlane/ngx-charts';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { FuseConfigService } from '@fuse/services/config.service';



@Component({
  selector: 'app-revit-area',
  templateUrl: './revit-area.component.html',
  styleUrls: ['./revit-area.component.scss']
})
export class RevitAreaComponent implements OnInit {

  constructor(public _accBimService: AccBimService, private _fuseConfigService: FuseConfigService) {
    this.apartmentAreas = _accBimService.getApartmentAreas();
    this._fuseConfigService.config = {
      layout: {
        navbar : {
          folded : true
        }
      }
    }
  }

  apartmentAreas: ApartmentAreas[];
  onNodesRendering: string[];
  

  ngOnInit(): void {

  }

  customAlgorithm(arg) {
    const dataRect = arg.rect;
    const dataDirection = arg.directions;

    const directionToIndexOffsets = {};
    directionToIndexOffsets[-1] = [2, 0];
    directionToIndexOffsets[+1] = [0, 2];

    const staticSideIndex = 0;
    const variedSideIndex = 1 - staticSideIndex;
    const staticSideDirection = dataDirection[staticSideIndex];
    const variedSideDirection = dataDirection[variedSideIndex];
    const staticSideIndexOffsets = directionToIndexOffsets[staticSideDirection];
    const variedSideIndexOffsets = directionToIndexOffsets[variedSideDirection];

    let sidesData = {
      staticSide: dataRect[2 + staticSideIndex] - dataRect[staticSideIndex],
        variedSide: dataRect[2 + variedSideIndex] - dataRect[variedSideIndex],
        static1: staticSideIndex + staticSideIndexOffsets[0],
        static2: staticSideIndex + staticSideIndexOffsets[1],
        varied1: variedSideIndex + variedSideIndexOffsets[0],
        varied2: variedSideIndex + variedSideIndexOffsets[1],
        staticDir: staticSideDirection,
        variedDir: variedSideDirection
    }

    const items = arg.items;
    let rowData = {
      sum : arg.sum,
      count : items.length,
      side: sidesData.variedSide
    }

    let i;
    let ii;
    const variedSidePart = [0, 0, 0, 0];
    const static1 = sidesData.static1;
    const static2 = sidesData.static2;
    let position = dataRect[static1];
    const dir = sidesData.staticDir;
    let side = sidesData.staticSide;
    let sum = rowData.sum;
    let rect;
    let delta;

    variedSidePart[sidesData.varied1] = dataRect[sidesData.varied1];
    variedSidePart[sidesData.varied2] = dataRect[sidesData.varied1] + sidesData.variedDir * rowData.side;
    for(i = 0, ii = 0 + rowData.count; i < ii; ++i) {
      rect = variedSidePart.slice();
      rect[static1] = position;
      delta = Math.round(side * items[i].value / sum) || 0;
      console.log(delta, items[i])
      sum -= items[i].value;
      side -= delta;
      position += dir * delta;
      rect[static2] = position;
      items[i].rect = rect;
    }
    dataRect[sidesData.varied1] = variedSidePart[sidesData.varied2];
  }

  getStaticSideIndex = function(rect) {
    return (rect[2] - rect[0]) < (rect[3] - rect[1]) ? 0 : 1;
  };

  testMethod(){
    console.log("test method")
  }

  buildSidesData(rect, directions, _staticSideIndex){
    
    const directionToIndexOffsets = {};
    directionToIndexOffsets[-1] = [2, 0];
    directionToIndexOffsets[+1] = [0, 2];
    const staticSideIndex = _staticSideIndex !== undefined ? _staticSideIndex : this.getStaticSideIndex(rect);
    const variedSideIndex = 1 - staticSideIndex;
    const staticSideDirection = directions[staticSideIndex];
    const variedSideDirection = directions[variedSideIndex];
    const staticSideIndexOffsets = directionToIndexOffsets[staticSideDirection];
    const variedSideIndexOffsets = directionToIndexOffsets[variedSideDirection];
    return {
        staticSide: rect[2 + staticSideIndex] - rect[staticSideIndex],
        variedSide: rect[2 + variedSideIndex] - rect[variedSideIndex],
        static1: staticSideIndex + staticSideIndexOffsets[0],
        static2: staticSideIndex + staticSideIndexOffsets[1],
        varied1: variedSideIndex + variedSideIndexOffsets[0],
        varied2: variedSideIndex + variedSideIndexOffsets[1],
        staticDir: staticSideDirection,
        variedDir: variedSideDirection
    };
}

calculateRectangles(nodes, head, totalRect, sidesData, rowData) {
  let i;
  let ii;
  const variedSidePart = [0, 0, 0, 0];
  const static1 = sidesData.static1;
  const static2 = sidesData.static2;
  let position = totalRect[static1];
  const dir = sidesData.staticDir;
  let side = sidesData.staticSide;
  let sum = rowData.sum;
  let rect;
  let delta;

  variedSidePart[sidesData.varied1] = totalRect[sidesData.varied1];
  variedSidePart[sidesData.varied2] = totalRect[sidesData.varied1] + sidesData.variedDir * rowData.side;
  for(i = head, ii = head + rowData.count; i < ii; ++i) {
      rect = variedSidePart.slice();
      rect[static1] = position;
      delta = Math.round(side * nodes[i].value / sum) || 0;
      sum -= nodes[i].value;
      side -= delta;
      position += dir * delta;
      rect[static2] = position;
      nodes[i].rect = rect;
  }
  totalRect[sidesData.varied1] = variedSidePart[sidesData.varied2];
}



  addTextNode(arg) {    
    arg.node.getAllNodes().forEach(element => {
      if(element.level > 0){
        element.label(`${element.data.Label} - (${element.data.Percentage.toFixed(2)}%)`)
      }
    });
  }


  customizeTooltip(arg) {

    const data = arg.node.data;
    let result = null;
    if (arg.node.isLeaf()) {
      result = `<span class='level'>${data.Label}-${data.Percentage.toFixed(2)}%</span><br/>Area: ${arg.valueText} SQM `;

    }

    return {
      text: result,
    };

  }



}
