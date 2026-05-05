import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('historicalCurrencyChart') chartCanvas!: ElementRef;
  selectedFromCurrency: string = '';
  selectedToCurrency: string = '';
  currencyRates: Record<string, number> = {};
  chart: any;
  labels: any;
  chartData: any;
  private subscriptions = new Subscription();
  constructor(private route: ActivatedRoute, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        this.selectedFromCurrency = params['from'] || '';
        this.selectedToCurrency = params['to'] || '';
      })
    );
    this.subscriptions.add(
      this.currencyService.getYearlyMonthlyRatesSequential(this.selectedToCurrency).subscribe((data) => {
        localStorage.setItem('historicalRates', JSON.stringify(data));
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      setTimeout(() => {
        this.createChartData();
      }, 1000); // Delay to ensure data is loaded

    }
  }

  currencyRatesData(currencyRates: Record<string, number>) {
    this.currencyRates = currencyRates;
  }

  // Create chart data based on historical rates and selected currencies
  createChartData() {
    const historicalRates = localStorage.getItem('historicalRates') ? JSON.parse(localStorage.getItem('historicalRates') || '[]') : [];
    this.labels = historicalRates.map((r: any) => r.date).reverse();

    if (this.selectedFromCurrency === 'EUR') {
      this.chartData = historicalRates.map((r: any) => r.rates[this.selectedToCurrency]).reverse();
    } else {
      this.chartData = historicalRates.map((r: any) => {
        const fromRate = this.currencyRates['EUR'];
        const toRate = r.rates[this.selectedToCurrency];
        return fromRate && toRate ? toRate * fromRate : 0;
      }).reverse();
    }
    this.createChart(this.labels, this.chartData);
  }

  getSelectedFromCurrency(selectedCurrency: string) {
    this.selectedFromCurrency = selectedCurrency
  }

  // Create a line chart to display historical exchange rates
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

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.subscriptions.unsubscribe();
  }
}



