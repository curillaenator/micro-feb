import { feedData, getNCellShip, findPositions, preventPlacing } from '@src/utils';
import { CellData } from '@src/types';

const REVERSE: Record<number, number> = {
  3: 1,
  2: 2,
  1: 3,
};

const SHIP_4 = Object.fromEntries([
  ...[0, -1, -2, -3].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(4, offsetY, 'v')]),
  ...[0, -1, -2, -3].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(4, offsetX, 'h')]),
]) as Record<string, CellData[]>;

const getMap = (x: number, y: number, orientation: 'v' | 'h', fieldData: Record<string, CellData>) => {
  const coord = orientation === 'v' ? y : x;

  const possibleMaps: string[] = [...new Array(10).fill(null)].map((_, i) =>
    i >= 7 ? `${orientation}_${-6 + i}` : `${orientation}_0`,
  );

  for (let i = 6; i >= 1; i--) {
    let cache = `${orientation}_0`;

    for (let j = 1; j <= 3; j++) {
      const pos = orientation === 'v' ? `${x}_${i + j}` : `${i + j}_${y}`;
      const { state } = fieldData[pos];

      if (state === 'transparent' || state === 'positive') {
        continue;
      } else {
        cache = `${orientation}_${REVERSE[j]}`;
        break;
      }
    }

    possibleMaps[i] = cache;
  }

  return possibleMaps[coord];
};

interface GetShip4Data {
  fieldData: Record<string, CellData>;
  shipOrientation: 'h' | 'v';
}

export const getShip4 = (pos: string, data: GetShip4Data): Record<string, CellData> | boolean => {
  const { fieldData, shipOrientation } = data;
  const [x, y] = pos.split('_').map((str) => +str);

  const currentShipMap = SHIP_4[getMap(x, y, shipOrientation, fieldData)];

  const positioned = currentShipMap.map(({ x: dX, y: dY }) => findPositions([x, y], [dX, dY]));

  const prevent = preventPlacing(positioned, 4, fieldData);

  if (prevent.isOwelapedByExistingShip) return false;

  return Object.fromEntries(positioned.map(([tX, tY], i) => feedData(currentShipMap, [tX, tY], i)));
};
