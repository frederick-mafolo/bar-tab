import { Beverage } from "./beverage.model";

export interface Order {
    beverage: Beverage;
    quantity: number;
  }
  