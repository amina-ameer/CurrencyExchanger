import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';
import { DetailsComponent } from './components/features/details/details.component';
import { HomeModule } from './components/features/home/home.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/features/home/home.module').then(m => m.HomeModule)
  },
  { path: 'details', component:DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
