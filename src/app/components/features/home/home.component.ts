import { Component, OnInit } from '@angular/core';
import { ExchangeRateResponse } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  popularRates: { [key: string]: number } = {};
  currencyRates:Record<string, number>={};
  selectedFromCurrency:string='';
  convertedAmount:number | undefined;


  constructor() { }

  

  ngOnInit(): void {

  }

  getSelectedFromCurrency(selectedCurrency:string){
    console.log('event',selectedCurrency)
    this.selectedFromCurrency=selectedCurrency
  }

  getCurrencyRatesData(currencyRates:Record<string, number>){
    this.currencyRates=currencyRates;
    console.log('currencyRates',this.currencyRates)
  }

  getConvertedAmount(convertedAmount:number){
    console.log('convertedAmount',convertedAmount)
    this.convertedAmount = convertedAmount;
  }
}
