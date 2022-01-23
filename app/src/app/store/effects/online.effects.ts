import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, merge, mergeMap, tap } from 'rxjs';
import { networkStatus$ } from 'src/app/services/online.service';
import {
  setOffline,
  setOnline,
} from '../actions/gameSettings.actions';

@Injectable()
export class OnlineEffects {
  online$ = createEffect(() =>
    networkStatus$.pipe(
      map((isOnline) => isOnline ? setOnline() : setOffline())
    )
  );

  constructor() {}
}
