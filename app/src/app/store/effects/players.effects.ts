import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PlayersService } from 'src/app/services/players.service';
import { stopGame } from '../actions/gameSettings.actions';
import {
  nextRound,
  player1IncrementScore,
  player2IncrementScore,
  resetScore,
  setUser1,
  setUser1Fail,
  setUser1Success,
  setUser2,
  setUser2Fail,
  setUser2Success,
} from '../actions/players.actions';
import {
  selectMaxScore,
  selectMaxScoreWithCurrentScore,
} from '../selectors/gameSettings.selectors';
//HIGHTLIGHT OfType with two types
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
  //HIGHLIGHT useEffectsErrorHandler
  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUser1),
        mergeMap((action) =>
          this.service.loadUser().pipe(
            map((user) => setUser1Success({ user })),
            catchError(() => of(setUser1Fail()))
          )
        )
      ),
      //Errors are handled (catchError) it is safe to disable resubscription
    {
      useEffectsErrorHandler: false,
    }
  );

  
  loadUsers2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUser2),
        mergeMap((action) =>
          this.service.loadUser().pipe(
            map((user) => setUser2Success({ user })),
            catchError(() => of(setUser2Fail()))
          )
        )
      ),
      //Errors are handled (catchError) it is safe to disable resubscription
    {
      useEffectsErrorHandler: false,
    }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private service: PlayersService
  ) {}
}
