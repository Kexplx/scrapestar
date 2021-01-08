import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWithPostfix',
})
export class SliceWithPostfixPipe implements PipeTransform {
  transform(text: string, length = 20): string {
    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + '...';
  }
}
