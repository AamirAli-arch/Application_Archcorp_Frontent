import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value != null){
      value = value.replace("AAEDXB\\","");
      value = value.replace("."," ");
      return this.toTitleCase(value);
    }
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
