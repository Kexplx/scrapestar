import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroprefix',
})
export class ZeroPrefixPipe implements PipeTransform {
  transform(value: number): string {
    const isDoubleDidgit = value >= 10;

    if (isDoubleDidgit) {
      return value.toString();
    }

    return '0' + value;
  }
}
