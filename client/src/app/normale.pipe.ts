import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normale'
})
export class NormalePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown { //important blanco _args
    if(typeof value!=='string') {
     return value;
    }
     const time = value;
     var heure = Number(time)/100;
     var timeValue;

      if(heure>0 && heure<=12) {
        timeValue="" + heure;
      }
      else if (heure>12){
        timeValue="" + (heure -12);
      }

      else if (heure==0){
        timeValue="12";
      }
      timeValue += ":00"

      timeValue += (heure>=12)? " PM" : " AM";

      return timeValue
    }
   
  
}


