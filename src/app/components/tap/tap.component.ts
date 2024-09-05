import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, OrderItem } from '../../state/app.state';
import { Router } from '@angular/router';
import { selectOrders } from '../../state/order.selectors';
import { clearOrders } from '../../state/order.actions';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {

  orders$: Observable<OrderItem[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.orders$ = this.store.select(selectOrders);
  }

  
  clearTab(): void {
    this.store.dispatch(clearOrders());
  }

  goToSummary(): void {
    this.router.navigate(['/summary']);
  }
}
