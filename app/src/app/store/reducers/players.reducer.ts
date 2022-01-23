import { createReducer, on } from '@ngrx/store';
import { Player } from 'src/app/models/player.models';
import * as playersActions from '../actions/players.actions';
export const playersFeatureKey = 'playersKey';

export interface PlayersState {
  players1Score: number;
  players1: Player;
  players2: Player;
  players2Score: number;
  isLoadingPlayer1: boolean;
  isLoadingPlayer2: boolean;
}

export const initialState: PlayersState = {
  players1: null,
  players1Score: 0,
  players2: null,
  players2Score: 0,
  isLoadingPlayer1: false,
  isLoadingPlayer2: false,
};

export const playersReducer = createReducer(
  initialState,
  on(playersActions.setUser1, (state) => ({
    ...state,
    isLoadingPlayer1: true,
  })),
  on(playersActions.setUser1Success, (state) => ({
    ...state,
    isLoadingPlayer1: false,
  })),
  on(playersActions.setUser1Fail, (state) => ({
    ...state,
    isLoadingPlayer1: false,
  })),
  on(playersActions.setUser2, (state) => ({
    ...state,
    isLoadingPlayer2: true,
  })),
  on(playersActions.setUser2Success, (state) => ({
    ...state,
    isLoadingPlayer2: false,
  })),
  on(playersActions.setUser2Fail, (state) => ({
    ...state,
    isLoadingPlayer2: false,
  })),
  on(playersActions.player1IncreaseScore, (state) => ({
    ...state,
    players1Score: state.players1Score+1,
  })),
  on(playersActions.player2IncreaseScore, (state) => ({
    ...state,
    players2Score: state.players2Score+1,
  })),  
  on(playersActions.resetScore, (state) => ({
    ...state,
    players1Score: 0,
    players2Score: 0,
  }))
);
