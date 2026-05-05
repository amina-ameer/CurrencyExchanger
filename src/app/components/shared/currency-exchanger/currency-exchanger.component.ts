import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../../../services/currency-service.service';
import { ExchangeRateResponse } from 'src/app/models/currency.model';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.css']
})
export class CurrencyExchangerComponent implements OnInit {
  constructor(private currencyService: CurrencyService,private router: Router,private route: ActivatedRoute) { }
  currencyList:string[] = ['USD','EUR','INR','GBP','JPY','KWD','BHD','OMR','JOD','AED'];
  popularRates: { [key: string]: number } = {};
  currencyRates:Record<string, number>={};
  @Output() selectedFromCurrency = new EventEmitter<string>();
  @Output() currencyRatesData = new EventEmitter<Record<string, number>>();
  currencyRate: number=0;
  //currencies: string[] = [];
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  amount: number | undefined;
  convertedAmount: number = 0;
  isDetail:boolean=false;

  ngOnInit(): void {
    this.currencyService.getExchangeRates(this.fromCurrency).subscribe((data: ExchangeRateResponse) => {
      this.currencyRates=data.rates;
      this.setPopularRates()
    });
    this.route.queryParams.subscribe(params => {
      console.log('query params',params)
      if(params['from']){
        this.isDetail=true;
        this.fromCurrency = params['from'] || 'EUR';
        this.toCurrency = params['to'] || 'USD';
        this.amount = params['amount'] ? parseFloat(params['amount']) : undefined;
        this.convertedAmount = params['convertedAmount'] ? parseFloat(params['convertedAmount']) : 0;
        this.currencyRate = params['currencyRate'] ? parseFloat(params['currencyRate']) : 0;
      }
      else{
        this.isDetail=false;
      }
      // this.fromCurrency = params['from'] || '';
      // this.toCurrency = params['to'] || '';
    });
  }
  setPopularRates() {
  this.popularRates = this.currencyList.reduce((acc, currency) => {
    if (this.currencyRates[currency]) {
      acc[currency] = this.currencyRates[currency];
    }
    return acc;
  }, {} as { [key: string]: number });
  console.log('popularRates',this.popularRates)
  this.currencyRatesData.emit(this.popularRates);
}
  swapCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
  }
  convertCurrency() {
    this.selectedFromCurrency.emit(this.fromCurrency)
    this.currencyService.getExchangeRates(this.fromCurrency).subscribe((data: ExchangeRateResponse) => {
      this.currencyRate = data.rates[this.toCurrency]
      //const rate = data.rates[this.toCurrency];
      this.convertedAmount = this.amount? this.amount * this.currencyRate : 0;
    });
  }
  showDetails() {
    this.isDetail = !this.isDetail;
    this.router.navigate(['/details'], { queryParams: { from: this.fromCurrency, to: this.toCurrency, amount: this.amount, convertedAmount: this.convertedAmount , currencyRate: this.currencyRate} });   
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}
