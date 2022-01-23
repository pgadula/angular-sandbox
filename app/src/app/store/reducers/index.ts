import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { gameSettingsReducer, GameSettingsState } from './gamesettings.reducer';
import { playersReducer, PlayersState } from './players.reducer';

export interface ApplicationState {
  players: PlayersState;
  gameSettings: GameSettingsState
}
export const selectApplicationState = (state: ApplicationState) => state;

export const reducers: ActionReducerMap<ApplicationState> = {
  players: playersReducer,
  gameSettings: gameSettingsReducer
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? []
  : [];
