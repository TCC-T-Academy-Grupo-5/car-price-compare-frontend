import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translations',
  standalone: true
})
export class TranslationsPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (!value) return value;
    let argIndex = 0;
    return value.replace(/%s/g, () => args[argIndex++] || '');
  }
}
