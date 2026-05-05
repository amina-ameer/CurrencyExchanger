import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../../services/currency-service.service';
import { ExchangeRateResponse } from 'src/app/models/currency.model';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.css']
})
export class CurrencyExchangerComponent implements OnInit {
  constructor(private currencyService: CurrencyService, private router: Router, private route: ActivatedRoute) { }
  @Output() selectedFromCurrency = new EventEmitter<string>();
  @Output() currencyRatesData = new EventEmitter<Record<string, number>>();
  @Output() convertedAmountData = new EventEmitter<number>();
  currencyList: string[] = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'KWD', 'BHD', 'OMR', 'JOD', 'AED'];
  popularRates: { [key: string]: number } = {};
  currencyRates: Record<string, number> = {};
  currencyRate: number = 0;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  amount: number | undefined;
  convertedAmount: number = 0;
  isDetail: boolean = false;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['from']) {
        this.isDetail = true;
        this.fromCurrency = params['from'] || 'EUR';
        this.toCurrency = params['to'] || 'USD';
        this.amount = params['amount'] ? parseFloat(params['amount']) : undefined;
        this.convertedAmount = params['convertedAmount'] ? parseFloat(params['convertedAmount']) : 0;
        this.currencyRate = params['currencyRate'] ? parseFloat(params['currencyRate']) : 0;
        this.getExchangeRates();
      }
      else {
        this.isDetail = false;
        this.getExchangeRates();
      }
      this.selectedFromCurrency.emit(this.fromCurrency)
    });
  }

  // Fetch exchange rates based on the selected from currency
  getExchangeRates() {
    this.subscriptions.add(
      this.currencyService.getExchangeRates(this.fromCurrency).subscribe((data: ExchangeRateResponse) => {
        this.currencyRates = data.rates;
        this.setPopularRates();
      })
    );
  }

  // Set popular rates based on the predefined currency list and emit the data to the parent component
  setPopularRates() {
    this.popularRates = this.currencyList.reduce((acc, currency) => {
      if (this.currencyRates[currency]) {
        acc[currency] = this.currencyRates[currency];
      }
      return acc;
    }, {} as { [key: string]: number });
    this.currencyRatesData.emit(this.popularRates);
  }

  // Swap the from and to currencies
  swapCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.selectedFromCurrency.emit(this.fromCurrency)
  }

  // Convert currency and emit the converted amount
  convertCurrency() {
    this.selectedFromCurrency.emit(this.fromCurrency)
    this.subscriptions.add(
      this.currencyService.getExchangeRates(this.fromCurrency).subscribe((data: ExchangeRateResponse) => {
        this.currencyRate = data.rates[this.toCurrency]
        this.convertedAmount = this.amount ? this.amount * this.currencyRate : 0;
        this.currencyRates = data.rates;
        this.setPopularRates()
        this.convertedAmountData.emit(this.convertedAmount);
      })
    );
  }

  showDetails() {
    //navigate to details page with query params
    this.isDetail = !this.isDetail;
    this.router.navigate(['/details'], { queryParams: { from: this.fromCurrency, to: this.toCurrency, amount: this.amount, convertedAmount: this.convertedAmount, currencyRate: this.currencyRate } });
  }

  backToHome() {
    //navigate back to home page
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    // Clean up any subscriptions or resources here
    this.subscriptions.unsubscribe();
  }
}
