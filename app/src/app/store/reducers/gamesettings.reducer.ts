import { createReducer, on } from '@ngrx/store';
import { Player } from 'src/app/models/player.models';
import { NetworkStatus } from 'src/app/services/online.service';
import { setOffline, setOnline, startGame, stopGame } from '../actions/gameSettings.actions';
import * as playersActions from '../actions/players.actions';

export interface GameSettingsState {
  maxScore: number;
  gameStatus: 'START' | 'STOP';
  networkStatus: NetworkStatus
}

export const initialState: GameSettingsState = {
  maxScore: 10,
  gameStatus: 'STOP',
  networkStatus: 'Online'
};

export const gameSettingsReducer = createReducer(
  initialState,
  on(startGame, (state) => ({ ...state, gameStatus: 'START' })),
  on(stopGame, (state) => ({ ...state, gameStatus: 'STOP' })),
  on(setOnline, (state) => ({ ...state, networkStatus: 'Online' })),
  on(setOffline, (state) => ({ ...state, networkStatus: 'Offline' })),
);
