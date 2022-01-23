import { createAction } from '@ngrx/store';

export const setUser1 = createAction('[PLAYERS] Set User 1');
export const setUser1Success = createAction('[PLAYERS] Set User 1 Success');
export const setUser1Fail = createAction('[PLAYERS] Set User 1 Fail');
export const player1IncrementScore = createAction('[PLAYERS] Player1 Increment Score');

export const setUser2 = createAction('[PLAYERS] Set User 2');
export const setUser2Success = createAction('[PLAYERS] Set User 2 Success');
export const setUser2Fail = createAction('[PLAYERS] Set User 2 Fail');
export const player2IncrementScore = createAction('[PLAYERS] Player 2 Increment Score');

export const resetScore = createAction('[PLAYERS] Reset Score');
export const nextRound = createAction('[PLAYERS] Next Round');
