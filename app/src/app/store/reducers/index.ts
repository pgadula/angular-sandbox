import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { playersFeatureKey, playersReducer, PlayersState } from './players.reducer';

export interface ApplicationState {
  [playersFeatureKey]: PlayersState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  [playersFeatureKey]: playersReducer,
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? []
  : [];
