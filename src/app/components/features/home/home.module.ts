import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DisplayCardComponent } from './components/display-card/display-card.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent } 
];

@NgModule({
    declarations: [HomeComponent, DisplayCardComponent],
    imports: [CommonModule,
              FormsModule,
              HttpClientModule, 
              SharedModule,
              RouterModule.forChild(routes)],
})
export class HomeModule { }