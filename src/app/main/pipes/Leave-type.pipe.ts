import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LeaveType'
})
export class LeaveTypePipe implements PipeTransform {

  transform(value: number): string {
    if(value == 1){
      return 'Annual';
    }
    if(value == 2){
      return 'Casual';
    }
    if(value == 3){
      return 'Sick';
    }
    if(value == 4){
      return 'Emergency';
    }
    if(value == 5){
      return 'Floating';
    }
    if(value == 6){
      return 'Unpaid';
    }
    if(value == 7){
      return 'Time Off';
    }
    
  }

}
