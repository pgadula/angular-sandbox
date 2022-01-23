import { createAction } from '@ngrx/store';

export const startGame = createAction('[GAME SETTINGS] Start Game');
export const stopGame = createAction('[GAME SETTINGS] Stop Game');

export const setOnline = createAction('[GAME SETTINGS] Online');
export const setOffline = createAction('[GAME SETTINGS] Offline');
