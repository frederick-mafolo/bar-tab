import { createReducer, on } from '@ngrx/store';
import { addBeverage, updateOrder, calculateTotal,clearOrders,addOrder, updateBeverage, removeBeverage } from './order.actions';
import { Order } from './app.state';

export const initialOrderState: Order = {
  items: [],
  total: 0,
  peopleCount: 1
};

export const orderReducer = createReducer(
  initialOrderState,
  on(addBeverage, (state, { orderItem }) => {
    const updatedItems = [...state.items, orderItem];
    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

    return {
      ...state,
      items: updatedItems,
      total: updatedTotal,
    };
  }),
  on(updateOrder, (state, { orderItems, peopleCount }) => ({
    ...state,
    items: orderItems,
    peopleCount
  })),
  
  on(updateBeverage, (state, { orderItem }) => {
    const updatedItems = state.items.map((item) =>
      item.beverage.name === orderItem.beverage.name ? orderItem : item
    );

    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    return {
      ...state,
      items: updatedItems,
      total: updatedTotal,
    };
  }),
  on(addOrder, (state, { orderItem }) => ({
    ...state,
    orders: [...state.items, orderItem]
  })),
  
  on(removeBeverage, (state, { beverage }) => ({
    ...state,
    items: state.items.filter(orderItem => orderItem.beverage.name !== beverage.name)
  })),
  

  on(calculateTotal, (state) => {
    const total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { ...state, total };
  }),
  on(clearOrders, (state) => ({
    ...state,
    items: [],
    total: 0
  }))
);
