
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Beverage } from '../../state/app.state';
import {  addBeverage, clearOrders, updateBeverage } from '../../state/order.actions';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { selectOrders } from '../../state/order.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-beverage-list',
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss']
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

    constructor(  private router: Router,private store: Store<AppState> , private toastService: ToastService) {}
  
    addAllToTab(): void {
      this.beverages.forEach((beverage) => {
        const quantity = this.quantities[beverage.name] || 0;
    
        if (quantity > 0) {
          this.store.select(selectOrders).pipe(take(1)).subscribe((currentOrders) => {
            const existingOrderItem = currentOrders.find((orderItem: { beverage: { name: string; }; }) => orderItem.beverage.name === beverage.name);
    
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
          });
        }
      });
    
      this.toastService.showToast('Your order has been placed or updated!', 'success');
      this.addButtonDisabled = true; 
    }
    
    clearTab(): void {
      // Clear the orders from the store
      this.store.dispatch(clearOrders());
    
      // Reset the quantities to zero for all beverages
      this.beverages.forEach(beverage => {
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
