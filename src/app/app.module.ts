import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/features/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyExchangerComponent } from './components/shared/currency-exchanger/currency-exchanger.component';
import { DetailsComponent } from './components/features/details/details.component';
import { CurrencyNamePipe } from './shared/pipes/currency-name.pipe';
import { DisplayCardComponent } from './components/features/home/components/display-card/display-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CurrencyExchangerComponent,
    DetailsComponent,
    CurrencyNamePipe,
    DisplayCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
