import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { orderBy } from 'lodash';
import { ReportsService } from '../services/reports.service';
import { ListCategories } from './models/GFACategories';

@Component({
  selector: 'app-revit-calc',
  templateUrl: './revit-calc.component.html',
  styleUrls: ['./revit-calc.component.scss']
})
export class RevitCalcComponent implements OnInit {
  totalGFA: number;
  sumOfBedrooms: number;
  floorAreaRatio: number = 6.4;
  totalPropertyArea: number;
  levelList: any[] = [];
  totalBedrooms: number;
  listFloors: any[] = [];
  listBedrooms: any[] = [];
  listSortedBedrooms: any[] = [];
  listBedroomNumbers: any[] = [];

  listBedroomCompact: any[] = [];

  listGFASellable: any[] = [];
  listNonGFASelleable: any[] = [];

  sumSellableGFA: number;
  sumSellableNonGFA: number;

  sumNonSellableGFA: number;
  sumNonSellableNonGFA: number;

  sumTotalGFA: number;
  sumTotalNonGFA: number;
  sumTotalGFANonGFA: number;

  sumTotalBuiltUpArea: number;

  constructor(
    private _fuseConfigService: FuseConfigService, 
    public _revitCalc: ReportsService) { }

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData(){
    this._revitCalc.getRevitCalculation("2741").subscribe(response => {
      this.levelList = response;
      this.getBUA(response);
    })
  }

  getBUA(response){
    let _listCategories = new ListCategories();
    let result = response.map(a => a.level);
    var flattened = [].concat.apply([],result);
    this.totalPropertyArea = 2314.14;

    //setting total gfa
    this.totalGFA =  (Math.round((this.totalPropertyArea * this.floorAreaRatio) * 100) / 100);
   
    const mappedResult = [].concat(...flattened.map((item) => item.levelDetailList.map((addr) => Object.assign({},  { id: addr.levelRevitElementId, levelElementName: addr.levelElementName, floor: item.levelName, area: (Math.round(addr.area * 100) / 100)   }))));
    const mappedResultSliced = [].concat(...flattened.map((item) => item.levelDetailList.map((addr) => Object.assign({},  { id: addr.levelRevitElementId, levelElementName: addr.levelElementName.slice(0, -4).trim(), floor: item.levelName, area: (Math.round(addr.area * 100) / 100)   }))));

    let joined = mappedResult.map(a => ({..._listCategories.list.find(p => a.levelElementName.includes(p.levelElementName)), ...a}));
    this.getSellable(mappedResultSliced);
    this.getNonSellable(mappedResultSliced);
    this.getFloorGFA(joined);
    this.setBedrooms(mappedResultSliced);
    this.getNumberOfBedrooms(mappedResultSliced);
    this.setTotalBuiltUpArea();
    
    let bedrooms = joined.filter(w => w.levelElementName.includes('BDRM'));

    var floorGroups = joined.reduce((p, c) => {
      var floor = c?.floor;
      if (!p.hasOwnProperty(floor)) {
        p[floor] = 0;
      }
      p[floor]++;
      return p;
    }, {});

    var floorsExtended = Object.keys(floorGroups).map(k => {
      return { value: k, count: floorGroups[k] };
    });

    this.listFloors = floorsExtended.reverse();

    var bedroomGroups = bedrooms.reduce((p, c) => {
      var area = c?.area;
      if (!p.hasOwnProperty(area)) {
        p[area] = 0;
      }
      p[area]++;
      return p;
    }, {});


    var group_to_values = bedrooms.reduce(function (obj, item) {
      obj[item.area] = obj[item.area] || [];
      obj[item.area].push({ area: item.area, id: item.id, itemName: item.levelElementName, floor: item.floor});
      return obj;
    }, []);

    var groups = Object.keys(group_to_values).map(function (key) {
      return {area: key, item: group_to_values[key]};
    });

    const flat = groups.reduce((r, e) => {
      e.item.forEach((obj) => r.push({area: e.area, itemName : obj.itemName, floor: obj.floor }));
      return r;
    }, []);
  
    //this.listBedrooms = groups;

    const sortedBedrooms = orderBy(flat, [v => v.itemName],['asc']);
    this.listSortedBedrooms = sortedBedrooms;
  }

  setBedrooms(list: any){
    let _listCategories = new ListCategories();
    let joined = list.map(a => ({..._listCategories.list.find(p => a.levelElementName === p.levelElementName.slice(0, -4).trim()), ...a}));
    //let bedrooms = joined.filter(w => w.levelElementName.includes('BDRM'));
    let bedrooms = joined;
    var group_by_floor =  bedrooms.reduce(function (obj, item) {
      obj[item.floor] = obj[item.floor] || [];
      obj[item.floor].push({ area: item.area, id: item.id, itemName: item.levelElementName, floor: item.floor, category: item.category});
      return obj;
    }, []);

    var floorGroups = Object.keys(group_by_floor).map(function (key) {
      return {area: key, item: group_by_floor[key]};
    });


    this.listBedroomCompact = floorGroups;

  }

  getSellable(list: any){
    let _listCategories = new ListCategories();
    let joined = list.map(a => ({..._listCategories.list.find(p => a.levelElementName === p.levelElementName.slice(0, -4).trim()), ...a}));
    var categoryGroup = joined.reduce(function (obj, item) {
      obj[item.category] = obj[item.category] || [];
      obj[item.category].push({ area: item.area, bedroom: item.levelElementName, floor: item.floor });
      return obj;
    }, []);

    var groups = Object.keys(categoryGroup).map(function (key) {
      return {category: key, item: categoryGroup[key]};
    });

   

    let sellableGFA = groups.filter(w => w.category == 'GFA - Sellable');
    const mappedResult_GFA = [].concat(...sellableGFA.map((item) => item.item.map((addr) => Object.assign({}, addr))));
    
    let result_GFA = mappedResult_GFA.map(a => a.area);
    
    let addedSellableGFA = result_GFA.reduce((a, b) => a + b, 0);
    this.sumSellableGFA = (Math.round((addedSellableGFA * 0.092903) * 100) / 100);
    

    let sellableNonGFA = groups.filter(w => w.category == 'Non GFA - Sellable');
    const mappedResult_NonGFA = [].concat(...sellableNonGFA.map((item) => item.item.map((addr) => Object.assign({}, addr))));
    let result_NonGFA = mappedResult_NonGFA.map(a => a.area);
    let addedSellableNonGFA = result_NonGFA.reduce((a, b) => a + b, 0);
    this.sumSellableNonGFA = (Math.round((addedSellableNonGFA * 0.092903) * 100) / 100);

  }

  getNonSellable(list: any){
    let _listCategories = new ListCategories();
    let joined = list.map(a => ({..._listCategories.list.find(p => a.levelElementName === p.levelElementName.slice(0, -4).trim()), ...a}));
    var categoryGroup = joined.reduce(function (obj, item) {
      obj[item.category] = obj[item.category] || [];
      obj[item.category].push({ area: item.area, bedroom: item.levelElementName, floor: item.floor });
      return obj;
    }, []);

    var groups = Object.keys(categoryGroup).map(function (key) {
      return {category: key, item: categoryGroup[key]};
    });

    let nonSellableGFA = groups.filter(w => w.category == 'GFA - Non Sellable');
    const mappedResult_GFA = [].concat(...nonSellableGFA.map((item) => item.item.map((addr) => Object.assign({}, addr))));
    let result_GFA = mappedResult_GFA.map(a => a.area);
    let addedNonSellableGFA = result_GFA.reduce((a, b) => a + b, 0);
    this.sumNonSellableGFA = (Math.round((addedNonSellableGFA * 0.092903) * 100) / 100);
    

    let nonSellableNonGFA = groups.filter(w => w.category == 'Non GFA - Non Sellable');
    const mappedResult_NonGFA = [].concat(...nonSellableNonGFA.map((item) => item.item.map((addr) => Object.assign({}, addr))));
    let result_NonGFA = mappedResult_NonGFA.map(a => a.area);
    let addedNonSellableNonGFA = result_NonGFA.reduce((a, b) => a + b, 0);
    this.sumNonSellableNonGFA = (Math.round((addedNonSellableNonGFA * 0.092903) * 100) / 100);

    
  }

  getFloorGFA(list: any){
    var categoryGroup = list.reduce(function (obj, item) {
      obj[item.category] = obj[item.category] || [];
      obj[item.category].push({ area: item.area, bedroom: item.levelElementName, floor: item.floor });
      return obj;
    }, []);

    var groups = Object.keys(categoryGroup).map(function (key) {
      return {category: key, item: categoryGroup[key]};
    });

  }

  getNumberOfBedrooms(list: any){
    let bedrooms = list.filter(w => w.levelElementName.includes('BDRM'));
    bedrooms = bedrooms.map(a => ({levelElementName: a.levelElementName.split('-')[0].trim()}));
    var counts = bedrooms.reduce((p, c) => {
      var name = c?.levelElementName;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    var countsExtended = Object.keys(counts).map(k => {
      return { name: k, count: counts[k] };
    });

    var sumOfBedrooms = countsExtended.reduce(function(acc, current) {
      return acc + current.count;
    }, 0);

    this.sumOfBedrooms = sumOfBedrooms;

    countsExtended = Object.keys(counts).map(k => {
      return { name: k, count: counts[k], sum: sumOfBedrooms, percentage: Math.round((counts[k]/sumOfBedrooms) * 100) };
    });

    this.listBedroomNumbers = countsExtended;
  }

  setTotalBuiltUpArea(){
    this.sumTotalGFA = this.sumSellableGFA + this.sumNonSellableGFA;
    this.sumTotalNonGFA = this.sumSellableNonGFA + this.sumNonSellableNonGFA;

    this.sumTotalGFANonGFA = this.sumTotalGFA + this.sumTotalNonGFA;
  }
 
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
