import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leaveStatus'
})
export class LeaveStatusPipe implements PipeTransform {

  transform(value: number): string {
    // if(value == 0){
    //   return 'Pending';
    // }
    if(value == 1){
      return 'Approved';
    }
    if(value == 2){
      return 'Rejected';
    }
    if(value == 3){
      return 'Cancelled';
    }
    if(value == 4){
      return 'Lead Approval Pending';
    }
    if(value == 5){
      return 'HR Approval Pending';
    }
    // if(value == 6){
    //   return 'Principal Approval Pending';
    // }
    // if(value == 7){
    //   return 'Approved By Lead';
    // }
    // if(value == 8){
    //   return 'Approved By Hr';
    // }
  }

}
