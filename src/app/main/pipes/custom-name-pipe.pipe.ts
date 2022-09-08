import {Pipe,PipeTransform}from  '@angular/core';

@Pipe({
    name: 'customNamePipe'

})

export class CustomNamePipe implements PipeTransform{
    transform(value: any): string  {
        var str="";
        value.forEach(element => {
            str += element.firstName + " " + element.lastName + ", "
        });
        
        return str;
    }
}

