import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CurrencyExchangerComponent } from './currency-exchanger/currency-exchanger.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyNamePipe } from '../../shared/pipes/currency-name.pipe';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CurrencyExchangerComponent, HeaderComponent, CurrencyNamePipe],
  imports: [CommonModule, FormsModule, HttpClientModule, MatIconModule, RouterModule],
  exports: [CurrencyExchangerComponent, HeaderComponent, CurrencyNamePipe]
})
export class SharedModule {}