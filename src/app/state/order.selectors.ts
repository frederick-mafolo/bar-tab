import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, Order } from '../state/app.state';

export const selectOrderState = createFeatureSelector<AppState, Order>('order');

export const selectOrders = createSelector(
  selectOrderState,
  (state: Order) => state.items
);

export const selectTotalCost = createSelector(
  selectOrderState,
  (state: Order) => state.items.reduce((sum, item) => sum + item.totalPrice, 0)
);

export const selectPeopleCount = createSelector(
  selectOrderState,
  (state: Order) => state.peopleCount
);

export const selectPricePerPerson = createSelector(
  selectTotalCost,
  selectPeopleCount,
  (totalCost, peopleCount) => peopleCount > 0 ? totalCost / peopleCount : totalCost
);
