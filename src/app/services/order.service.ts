import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  getTotalCost(): number {
    return this.orders.reduce((total, order) => total + order.beverage.price * order.quantity, 0);
  }

  getOrders(): Order[] {
    return this.orders;
  }

  clearOrders(): void {
    this.orders = [];
  }

  exportToCSV(): string {
    const rows = this.orders.map(order => `${order.beverage.name},${order.quantity},${order.beverage.price * order.quantity}`);
    return `Beverage,Quantity,Total\n${rows.join('\n')}`;
  }
}
