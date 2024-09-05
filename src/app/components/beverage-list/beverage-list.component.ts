import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Beverage } from '../../state/app.state';
import {
  addBeverage,
  clearOrders,
  removeBeverage,
  updateBeverage,
} from '../../state/order.actions';
import { ToastService } from '../../services/toast.service';
import { selectOrders } from '../../state/order.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-beverage-list',
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss'],
})
export class BeverageListComponent {
  beverages: Beverage[] = [
    { name: 'Beer', price: 45.0 },
    { name: 'Cider', price: 52.0 },
    { name: 'Premix', price: 59.0 },
  ];

  quantities: { [key: string]: number } = {
    Beer: 0,
    Cider: 0,
    Premix: 0,
  };

  addButtonDisabled = false;
  isChanged = false;

  constructor(
    private store: Store<AppState>,
    private toastService: ToastService
  ) {}

  addAllToTab(): void {
    let hasValidOrder = false; 
  
    this.beverages.forEach((beverage) => {
      const quantity = this.quantities[beverage.name] || 0;
  
      this.store.select(selectOrders).pipe(take(1)).subscribe((currentOrders) => {
        const existingOrderItem = currentOrders.find(
          (orderItem: { beverage: { name: string; }; }) => orderItem.beverage.name === beverage.name
        );
  
        if (quantity > 0) {
          hasValidOrder = true; 
  
          if (existingOrderItem) {
            // Dispatch update action if the item already exists
            this.store.dispatch(updateBeverage({ 
              orderItem: { 
                beverage, 
                quantity, 
                totalPrice: beverage.price * quantity 
              } 
            }));
          } else {
            // Dispatch add action if the item does not exist
            this.store.dispatch(addBeverage({
              orderItem: {
                beverage,
                quantity,
                totalPrice: beverage.price * quantity
              }
            }));
          }
        } else if (existingOrderItem) {
     
          this.store.dispatch(removeBeverage({ beverage }));
        }
      });
    });
  
    if (hasValidOrder) {
      this.toastService.showToast('Your order has been placed or updated!', 'success');
      this.addButtonDisabled = true; 
    } else {
      this.toastService.showToast('Please add at least one beverage before proceeding.', 'warning');
    }
  }
  
  clearTab(): void {
 
    this.store.dispatch(clearOrders());

    this.beverages.forEach((beverage) => {
      this.quantities[beverage.name] = 0;
    });

    this.toastService.showToast('The tab has been cleared!', 'success');

    this.addButtonDisabled = false;
  }

  onQuantityChange(): void {
    this.isChanged = true;
    this.addButtonDisabled = false;
  }
}
