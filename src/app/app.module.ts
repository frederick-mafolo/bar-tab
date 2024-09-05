import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideZoneChangeDetection } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';

import { orderReducer } from './state/order.reducer';
import { OrderEffects } from './state/order.effects'; 

import { AppComponent } from './app.component'; 
import { BeverageListComponent } from './components/beverage-list/beverage-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { routes } from './app.routes';
import { ToastComponent } from './shared/toast/toast.component';
import { TapComponent } from './components/tap/tap.component'; 

@NgModule({
  declarations: [
    AppComponent,
    BeverageListComponent,
    OrderSummaryComponent,
    ToastComponent,
    TapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    StoreModule.forRoot({ order: orderReducer }), 
    EffectsModule.forRoot([OrderEffects]), 
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
