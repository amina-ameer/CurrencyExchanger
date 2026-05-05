import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent implements OnInit {
currencyList:string[] = ['USD','EUR','INR','GBP','JPY','KWD','BHD','OMR','JOD','AUD'];
@Input() selectedFromCurrency:string=''
@Input() currencyRates:Record<string, number>={}
  constructor() { }

  ngOnInit(): void {
    console.log('selctedFromCurrency',this.selectedFromCurrency)
    console.log('currencyRates',this.currencyRates)
  }

}
