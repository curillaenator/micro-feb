import { createEvent, createStore } from 'effector';

import { INITIAL_FIELD_STATE } from '@src/constants';
import type { CellData } from '@src/types';

interface GameStore {
  p1: Record<string, CellData>;
  p2: Record<string, CellData>;

  p1Ships: number;
  p2Ships: number;
}

const GAME_INITIAL_STATE: GameStore = {
  p1: INITIAL_FIELD_STATE,
  p2: INITIAL_FIELD_STATE,

  p1Ships: 0,
  p2Ships: 0,
};

export const gameReset = createEvent();

export const setCellsP1 = createEvent<Record<string, CellData>>();
export const setCellsP2 = createEvent<Record<string, CellData>>();

export const setShipsP1 = createEvent();
export const setShipsP2 = createEvent();

export const $game = createStore<GameStore>(GAME_INITIAL_STATE);

$game
  .on(gameReset, () => GAME_INITIAL_STATE)
  .on(setShipsP1, (state) => ({
    ...state,
    p1Ships: state.p1Ships + 1,
  }))
  .on(setShipsP2, (state) => ({
    ...state,
    p2Ships: state.p2Ships + 1,
  }))
  .on(setCellsP1, (state, cellsP1) => ({
    ...state,
    p1: {
      ...state.p1,
      ...cellsP1,
    },
  }))
  .on(setCellsP2, (state, cellsP2) => ({
    ...state,
    p2: {
      ...state.p2,
      ...cellsP2,
    },
  }));
