import { getNCellShip } from '@src/utils/getNCellShip';
import type { CellData } from '@src/types';

export const SHIPS = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

export const FIELD_GENERATOR = new Array(10)
  .fill(0)
  .map((_, row) =>
    new Array(10).fill(0).map((_, col) => [
      `${col}_${row}`,
      {
        x: col,
        y: row,
        state: 'transparent',
      },
    ]),
  )
  .flat() as [string, CellData][];

export const INITIAL_FIELD_STATE = Object.fromEntries(FIELD_GENERATOR);

export const SHIP_MAPS: Record<number, Record<string, CellData[]>> = {
  4: Object.fromEntries([
    ...[0, -1, -2, -3].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(4, offsetY, 'v')]),
    ...[0, -1, -2, -3].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(4, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  3: Object.fromEntries([
    ...[0, -1, -2].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(3, offsetY, 'v')]),
    ...[0, -1, -2].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(3, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  2: Object.fromEntries([
    ...[0, -1].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(2, offsetY, 'v')]),
    ...[0, -1].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(2, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  1: Object.fromEntries([
    ...[0].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(1, offsetY, 'v')]),
    ...[0].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(1, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
};
