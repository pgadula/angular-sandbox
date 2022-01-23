import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { filter, pipe, scan } from 'rxjs';
import { ScoreHistory } from 'src/app/models/player.models';
import { ApplicationState, selectApplicationState } from '../reducers';

export const selectPlayersState = (state: ApplicationState) => state.players;

export const selectPlayer1Score = createSelector(
  selectPlayersState,
  (state) => state.player1Score
);

export const selectPlayer2Score = createSelector(
  selectPlayersState,
  (state) => state.player2Score
);

export const selectPlayersScore = createSelector(
  selectPlayer1Score,
  selectPlayer2Score,
  (player1, player2) => ({ player1, player2 })
);

export const selectPlayers2Score = createSelector(
  selectPlayersState,
  (state) => state.player2Score
);

export const selectPlayers = createSelector(
  selectPlayersState,
  ({ player1, player2 }) => ({ player1, player2 })
);

//Extracting a pipeable operator
export const selectPlayersWithOperators = pipe(
  select(selectPlayers),
  filter((val) => val.player1 != null && val.player2 != null)
);

export const selectPlayersRxjsOperators = pipe(
  select(selectPlayers),
  filter((players) => players?.player1 != null && players.player2 != null)
);

export const selectLastScoreHistory = (count: number) => {
  return pipe(
    select(selectPlayersScore),
    // Combines the last `count` state values in array
    scan((acc, { player1, player2 }) => {
      return [{ player1, player2, date: new Date() }, ...acc].filter(
        (val, index) => index < count && val !== null
      );
    }, [] as ScoreHistory[])
  );
};
