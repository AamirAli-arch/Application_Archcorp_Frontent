import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sqmConvert'
})
export class SqmConvertPipe implements PipeTransform {

  transform(value: number, args: string): number {
    if(args == "sqft-sqm"){
      return (Math.round((value * 0.092903) * 100) / 100);
    }
    if(args == "ft-m"){
      return (Math.round((value * 0.3048) * 100) / 100);

    }
    return value;
  }

}
