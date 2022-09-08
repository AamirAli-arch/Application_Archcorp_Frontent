import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bedroomName'
})
export class BedroomNamePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if(!value.includes('BDRM')){
      return value;
    }

    value = value.replace('BDRM', ' Bedroom')
    return value;
  }

}
