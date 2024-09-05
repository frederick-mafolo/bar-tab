import { createAction, props } from '@ngrx/store';
import { OrderItem } from './app.state';
import { Beverage } from '../models/beverage.model';

export const addBeverage = createAction(
  '[Order] Add Beverage',
  props<{ orderItem: OrderItem }>()
);

export const updateOrder = createAction(
  '[Order] Update Order',
  props<{ orderItems: OrderItem[]; peopleCount: number }>()
);

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ orderItem: { beverage: Beverage; quantity: number } }>()
);

export const updateBeverage = createAction(
  '[Order] Update Beverage',
  props<{ orderItem: OrderItem }>()
);

export const calculateTotal = createAction(
  '[Order] Calculate Total'
);

export const clearOrders = createAction(
  '[Order] Clear Orders'
);
