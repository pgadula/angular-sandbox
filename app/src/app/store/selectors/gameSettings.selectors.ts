import { concatLatestFrom } from '@ngrx/effects';
import { createSelector, select } from '@ngrx/store';
import { filter, pipe } from 'rxjs';
import { ApplicationState } from '../reducers';
import { selectPlayersScore } from './players.selectors';

const selectGameSettingsState = (state: ApplicationState) => state.gameSettings;

export const selectMaxScore = createSelector(
  selectGameSettingsState,
  (state) => state.maxScore
);

export const selectMaxScoreWithCurrentScore = createSelector(
  selectMaxScore,
  selectPlayersScore,
  (maxScore, { player1, player2 }) => ({ maxScore, player1, player2 })
);

export const selectGameStatus = createSelector(
  selectGameSettingsState,
  ({ gameStatus }) => gameStatus
);

export const selectOnGameStart = pipe(
  select(selectGameStatus),
  filter((status) => status === 'START')
);

export const selectOnGameStop = pipe(
  select(selectGameStatus),
  filter((status) => status === 'STOP')
);

export const selectNetworkStatus = createSelector(
    selectGameSettingsState,
    ({ networkStatus }) => networkStatus
  );
