import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, forkJoin, from, Observable, toArray } from 'rxjs';
import { ExchangeRateResponse, HistoricalRateResponse } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private API_KEY = '7954099b6fba184a3f3caf2229febea1'; // Replace with your actual API key
  private API_URL = `https://api.exchangerate-api.com/v4/latest/`; // Base URL for the API
  private baseUrl=`http://data.fixer.io/api`
  constructor(private http: HttpClient) { }

  getExchangeRates(base: string): Observable<ExchangeRateResponse> {
    return this.http.get<ExchangeRateResponse>(`${this.API_URL}${base}`);
  }
  getHistoricalRates(base:string,date:string):Observable<HistoricalRateResponse>{
    return this.http.get<HistoricalRateResponse>(`${this.baseUrl}/${date}?access_key=${this.API_KEY}&base=${base}`);
  }

  getYearlyMonthlyRatesSequential(symbols: string): Observable<any[]> {
  const dates = [];
  const now = new Date();

  // Create the list of 12 end-of-month dates
  for (let i = 0; i < 12; i++) {
    const lastDay = new Date(now.getFullYear(), now.getMonth() - i, 0);
    dates.push(lastDay.toISOString().split('T')[0]);
  }

  // Process them one-by-one with a 1-second delay between each
  return from(dates).pipe(
    concatMap(date => 
      this.http.get(`${this.baseUrl}/${date}?access_key=${this.API_KEY}&base=EUR&symbols=${symbols}`)
      .pipe(delay(1000)) // 1 second gap to avoid the 429 error
    ),
    toArray() // Collect all 12 responses back into an array
  );
}
}
