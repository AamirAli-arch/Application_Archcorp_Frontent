import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workedHours'
})
export class WorkedHoursPipe implements PipeTransform {

  transform(value: any): string {
    if(value > 0){
      var hours = Math.floor(value / 60);  
      var minutes = value % 60;
      return hours + ":" + minutes.toFixed(0);
    }else{
      return '';
    }
  }
}
