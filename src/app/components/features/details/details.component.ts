import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedFromCurrency: string='';
  selectedToCurrency: string='';
  currencyRates: Record<string, number>={};
  @ViewChild('historicalCurrencyChart') chartCanvas!: ElementRef;
  chart: any;
  labels: any;
  chartData: any;
  constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
       this.route.queryParams.subscribe(params => {
        this.selectedFromCurrency = params['from'] || '';
        this.selectedToCurrency = params['to'] || '';
       })
        //  this.currencyService.getHistoricalRates('EUR', '2020-01-01').subscribe((data)=>{
        //     console.log('datsa',data)
        // })
        // this.currencyService.getYearlyMonthlyRatesSequential(this.selectedToCurrency).subscribe((data)=>{
        //   console.log('datsa',data);
        //   localStorage.setItem('historicalRates', JSON.stringify(data));
        // });
        
       
      //this.createChart(labels, data)
      }
      ngAfterViewInit(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      setTimeout(() => {
        this.createChartData();
      }, 1000); // Delay to ensure data is loaded
             
    }
  }

  currencyRatesData(currencyRates:Record<string, number>){
    console.log('currencyRates',currencyRates)
    this.currencyRates = currencyRates;
  }

  createChartData() {
    const historicalRates = localStorage.getItem('historicalRates') ? JSON.parse(localStorage.getItem('historicalRates') || '[]') : [];
    this.labels = historicalRates.map((r: any) => r.date).reverse();

    if (this.selectedFromCurrency === 'EUR') {
      this.chartData = historicalRates.map((r: any) => r.rates[this.selectedToCurrency]).reverse();
    } else {
      this.chartData = historicalRates.map((r: any) => {
        console.log(`Processing historical rate for ${r.date}:`, r);
        const fromRate = this.currencyRates['EUR'];
        const toRate = r.rates[this.selectedToCurrency];
        console.log(`Calculating rate for ${r.date}: fromRate=${fromRate}, toRate=${toRate}`);
        return fromRate && toRate ? toRate * fromRate : 0;
      }).reverse();
    }

    console.log('labels', this.labels);
    console.log('chartData', this.chartData);
    this.createChart(this.labels, this.chartData);
  }
getSelectedFromCurrency(selectedCurrency:string){
    console.log('event',selectedCurrency)
    this.selectedFromCurrency=selectedCurrency
  }

  createChart(labels: string[], data: number[]) {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${this.selectedFromCurrency} to ${this.selectedToCurrency}`,
          data: data,
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Historical Rates (Past 12 Months)' } }
      }
    });
  }
}

 

