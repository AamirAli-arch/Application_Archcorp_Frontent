import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupArea'
})
export class GroupAreaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
