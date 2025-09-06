import { Pipe, PipeTransform } from '@angular/core';
import { displayNameOfColor } from '../services/helper';

@Pipe({
  name: 'colorName',
})
export class ColorNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return displayNameOfColor(value);
  }
}
