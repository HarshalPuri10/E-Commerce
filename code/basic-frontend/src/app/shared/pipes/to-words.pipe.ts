import { Pipe, PipeTransform } from '@angular/core';
import { ToWords } from 'to-words';
@Pipe({
  name: 'toWords',
})
export class ToWordsPipe implements PipeTransform {
  transform(value: number): string {
    // Create an instance of the toWords converter
    const converter = new ToWords({
      localeCode: 'en-IN',
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
      },
    });

    // Convert the number to words
    return converter.convert(value);
  }
}
