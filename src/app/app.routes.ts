import { Routes } from '@angular/router';

import { BeverageListComponent } from './components/beverage-list/beverage-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: '/beverages', pathMatch: 'full' },
  { path: 'beverages', component: BeverageListComponent },
  { path: 'summary', component: OrderSummaryComponent },
  { path: '**', redirectTo: '' }
];