import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromEvent, map, merge, mergeMap, tap } from 'rxjs';
import {
  setOffline,
  setOnline,
} from '../actions/gameSettings.actions';

export const networkStatus$ = merge(
  fromEvent(window, 'online'),
  fromEvent(window, 'offline')
).pipe(
  map(() => navigator.onLine),
);

//HIGHLIGHT any observable that produces new actions
@Injectable()
export class OnlineEffects {
  online$ = createEffect(() =>
    networkStatus$.pipe(
      map((isOnline) => isOnline ? setOnline() : setOffline())
    )
  );

  constructor() {}
}
