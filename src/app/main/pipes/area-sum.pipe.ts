import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaSum'
})
export class AreaSumPipe implements PipeTransform {
  transform(value: any[], ...args: any): any {

    value = value.filter(w => w.category == args[0]);
    var sumOfArea = value.reduce(function(acc, current) {
      return acc + current.area;
    }, 0);


    var group_by_floor =  value.reduce(function (obj, item) {
      obj[item.floor] = obj[item.floor] || [];
      obj[item.floor].push({ area: item.area, sum:(Math.round(sumOfArea * 100) / 100), id: item.id, itemName: item.itemName, floor: item.floor, category: item.category });
      return obj;
    }, []);

    var floorGroups = Object.keys(group_by_floor).map(function (key) {
      return {area: key, item: group_by_floor[key]};
    });
    
    return floorGroups;
  }

}
