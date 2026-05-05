import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CurrencyService } from './currency-service.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose an exchange rate retrieval function', () => {
    const getRates =
      (service as any).getExchangeRate ||
      (service as any).getExchangeRates ||
      (service as any).fetchRates ||
      (service as any).getRates;

    expect(getRates).toBeDefined();
    expect(typeof getRates).toBe('function');
  });
});
