import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'view'
})
export class ViewPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
