import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap } from 'rxjs';
import { stopGame } from '../actions/gameSettings.actions';
import {
  nextRound,
  player1IncrementScore,
  player2IncrementScore,
  resetScore,
} from '../actions/players.actions';
import {
  selectMaxScore,
  selectMaxScoreWithCurrentScore,
} from '../selectors/gameSettings.selectors';

@Injectable()
export class PlayersEffects {
  score$ = createEffect(() =>
    this.actions$.pipe(
      ofType(player1IncrementScore, player2IncrementScore),
      concatLatestFrom((action) =>
        this.store.select(selectMaxScoreWithCurrentScore)
      ),
      mergeMap(([x, { player1, maxScore, player2 }]) =>
        player1 >= maxScore || player2 >= maxScore
          ? [resetScore(), stopGame()]
          : [nextRound()]
      )
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
