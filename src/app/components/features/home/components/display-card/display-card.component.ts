import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent implements OnInit {
  currencyList:string[] = ['USD','EUR','INR','GBP','JPY','KWD','BHD','OMR','JOD','AED'];

  @Input() selectedFromCurrency:string=''
  @Input() currencyRates:Record<string, number>={};
  @Input() convertedAmount:number | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }


}
