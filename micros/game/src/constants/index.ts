import type { CellData } from '@src/types';

export const FIELD_GENERATOR = new Array(10)
  .fill(0)
  .map((_, row) =>
    new Array(10).fill(0).map((_, col) => [
      `${col}_${row}`,
      {
        x: col,
        y: row,
      },
    ]),
  )
  .flat() as [string, CellData][];

export const INITIAL_FIELD_STATE = Object.fromEntries(FIELD_GENERATOR);
