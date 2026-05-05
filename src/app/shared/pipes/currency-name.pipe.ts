import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyName'
})
export class CurrencyNamePipe implements PipeTransform {

private currencyNames: { [key: string]: string } = {
    'USD': 'US Dollar',
    'EUR': 'European union Euro',
    'INR': 'Indian Rupee',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'KWD': 'Kuwaiti Dinar',
    'BHD': 'Bahraini Dinar',
    'OMR': 'Omani Rial',
    'JOD': 'Jordanian Dinar',
    'AUD': 'Australian Dollar'
  };
  transform(value: unknown, ...args: unknown[]): unknown {
    return this.currencyNames[value as string] || value;
  }

}
