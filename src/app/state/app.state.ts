export interface Beverage {
  name: string;
  price: number;
}

export interface OrderItem {
  beverage: Beverage;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
  peopleCount: number;
}

export interface AppState {
  order: Order;
}
