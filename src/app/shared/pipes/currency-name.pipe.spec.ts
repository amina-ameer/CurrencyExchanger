import { CurrencyNamePipe } from './currency-name.pipe';

describe('CurrencyNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a currency code into a display name', () => {
    const pipe = new CurrencyNamePipe();
    const result = pipe.transform('USD');

    expect(typeof result).toBe('string');
    expect((result as string).length).toBeGreaterThan(0);
  });

  it('returns the original value when the currency code is not recognized', () => {
    const pipe = new CurrencyNamePipe();
    const unknownValue = 'XYZ';

    expect(pipe.transform(unknownValue)).toBe(unknownValue);
  });
});
