import { createReducer, on } from '@ngrx/store';
import { Player } from 'src/app/models/player.models';
import * as playersActions from '../actions/players.actions';

export interface PlayersState {
  player1Score: number;
  player1: Player;
  player2: Player;
  player2Score: number;
  isLoadingPlayer1: boolean;
  isLoadingPlayer2: boolean;
  history: { player1: number; player2: number; date: Date }[];
}

export const initialState: PlayersState = {
  player1: null,
  player1Score: 0,
  player2: null,
  player2Score: 0,
  isLoadingPlayer1: false,
  isLoadingPlayer2: false,
  history: [],
};

export const playersReducer = createReducer(
  initialState,
  on(playersActions.setUser1, (state) => ({
    ...state,
    isLoadingPlayer1: true,
  })),
  on(playersActions.setUser1Success, (state, {user}) => ({
    ...state,
    isLoadingPlayer1: false,
    player1: user
  })),
  on(playersActions.setUser1Fail, (state) => ({
    ...state,
    isLoadingPlayer1: false,
  })),
  on(playersActions.setUser2, (state) => ({
    ...state,
    isLoadingPlayer2: true,
  })),
  on(playersActions.setUser2Success, (state, {user}) => ({
    ...state,
    player2: user,
    isLoadingPlayer2: false,
  })),
  on(playersActions.setUser2Fail, (state) => ({
    ...state,
    isLoadingPlayer2: false,
  })),
  on(playersActions.player1IncrementScore, (state) => ({
    ...state,
    player1Score: state.player1Score + 1,
    history: [
      ...state.history,
      {
        player1: state.player1Score,
        player2: state.player2Score,
        date: new Date(),
      },
    ],
  })),
  on(playersActions.player2IncrementScore, (state) => ({
    ...state,
    player2Score: state.player2Score + 1,
    history: [
      ...state.history,
      {
        player1: state.player1Score,
        player2: state.player2Score,
        date: new Date(),
      },
    ],
  })),
  on(playersActions.resetScore, (state) => ({
    ...state,
    player1Score: 0,
    player2Score: 0,
    history: [],
  }))
);
