import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateResponse } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedFromCurrency: string='';
  selectedToCurrency: string='';
  constructor(private currencyService: CurrencyService,private route: ActivatedRoute) { }

    ngOnInit(): void {
       this.route.queryParams.subscribe(params => {
        this.selectedFromCurrency = params['from'] || '';
        this.selectedToCurrency = params['to'] || '';
       })
        //  this.currencyService.getHistoricalRates('EUR', '2020-01-01').subscribe((data)=>{
        //     console.log('datsa',data)
        // })
        this.currencyService.getYearlyMonthlyRatesSequential(this.selectedToCurrency).subscribe((data)=>{
          console.log('datsa',data);
          localStorage.setItem('historicalRates', JSON.stringify(data));
        });
      }

getSelectedFromCurrency(selectedCurrency:string){
    console.log('event',selectedCurrency)
    this.selectedFromCurrency=selectedCurrency
  }
}
