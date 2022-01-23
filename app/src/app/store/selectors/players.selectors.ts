import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { filter, pipe } from 'rxjs';
import { playersFeatureKey, PlayersState } from '../reducers/players.reducer';

const selectPlayersState =
  createFeatureSelector<PlayersState>(playersFeatureKey);

export const selectPlayers1Score = createSelector(
  selectPlayersState,
  (state) => state.players1Score
);

export const selectPlayers2Score = createSelector(
  selectPlayersState,
  (state) => state.players2Score
);

export const selectPlayers = createSelector(
  selectPlayersState,
  ({ players1, players2 }) => ({ players1, players2 })
);

//HIGHLIGHT
export const selectPlayersRxjsOperators = pipe(
  select(selectPlayers),
  filter((val) => val.players1 != null && val.players2 != null)
);
