import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { addBeverage, updateOrder, calculateTotal } from './order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions) {}

  calculateTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBeverage, updateOrder),
      map(() => calculateTotal())
    )
  );
}
