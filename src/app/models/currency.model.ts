export interface ExchangeRateResponse {
  provider: string;
  WARNING_UPGRADE_TO_V6: string;
  terms: string;
  base: string;
  date: string;
  time_last_updated: number;
  rates: Record<string, number>;
}

export interface HistoricalRateResponse {
  success: boolean;
  historical: boolean;
  date: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}