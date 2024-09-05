import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, OrderItem } from '../../state/app.state';
import { selectOrders, selectTotalCost, selectPricePerPerson, selectPeopleCount } from '../../state/order.selectors';
import { updateOrder, clearOrders } from '../../state/order.actions';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  orders$: Observable<OrderItem[]>; 
  totalCost$: Observable<number>; 
  pricePerPerson$: Observable<number>; 
  peopleCount$: Observable<number>;

  constructor(private store: Store<AppState>) {

    this.orders$ = this.store.select(selectOrders);
    this.totalCost$ = this.store.select(selectTotalCost);
    this.pricePerPerson$ = this.store.select(selectPricePerPerson);
    this.peopleCount$ = this.store.select(selectPeopleCount);
  }

  // Dispatch an action to clear the orders
  clearTab(): void {
    this.store.dispatch(clearOrders());
  }

  // Dispatch a combined action to update the order items and the number of people splitting the bill
  updatePeopleCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const peopleCount = parseInt(inputElement.value, 10) || 1;
   
    this.orders$.subscribe(orders => {
      this.store.dispatch(updateOrder({ orderItems: orders, peopleCount: peopleCount }));
    }).unsubscribe();
  }

  exportAsPDF(): void {

    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.default();
      let y = 10; 
  
      doc.text('Order Summary', 10, y); 
      y += 10;
  
      this.orders$.subscribe(orders => {
        orders.forEach(order => {
          doc.text(
            `${order.beverage.name} x ${order.quantity} = R${(order.beverage.price * order.quantity).toFixed(2)}`,
            10,
            y
          );
          y += 10; 
        });
  
        this.totalCost$.subscribe(totalCost => {
          doc.text(`Total: R${totalCost.toFixed(2)} `, 10, y); 
          y += 10;
  
          this.peopleCount$.subscribe(numberOfPeople => {
            if (numberOfPeople > 1) {
              doc.text(`Price per person: R${(totalCost / numberOfPeople).toFixed(2)}`, 10, y);
            }
            
            doc.save('receipt.pdf');
          }).unsubscribe(); 
  
        }).unsubscribe(); 
  
      }).unsubscribe(); 
    });
  }
  
}
