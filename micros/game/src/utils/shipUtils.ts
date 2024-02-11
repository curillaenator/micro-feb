import { SHIP_MAPS } from '@src/constants';
import { CellData } from '@src/types';

export const feedData = (currentShipMap: CellData[], [tX, tY]: [number, number], i: number) => [
  `${tX}_${tY}`,
  { x: tX, y: tY, state: currentShipMap[i].state },
];

export const findPositions = ([x, y]: [number, number], [dX, dY]: [number, number]) => [x + dX, y + dY];

export const preventPlacing = (positioned: number[][], fieldData: Record<string, CellData>) =>
  positioned.some(([cX, cY]) => fieldData[`${cX}_${cY}`]?.state === 'primary' || cX < -1 || cY < -1);

const TRAVERSE_ASSOC: Record<number, Record<number, number>> = {
  4: {
    3: 1,
    2: 2,
    1: 3,
  },
  3: {
    2: 1,
    1: 2,
  },
  2: {
    1: 1,
  },
};

export const traverseShip = (
  coords: { x: number; y: number; offset: number },
  shipSize: number,
  orientation: string,
  fieldData: Record<string, CellData>,
) => {
  const { x, y, offset } = coords;
  let shipMapName = `${orientation}_0`;

  if (shipSize !== 1) {
    for (let j = 1; j <= shipSize - 1; j++) {
      const pos = orientation === 'v' ? `${x}_${offset + j}` : `${offset + j}_${y}`;
      const { state } = fieldData[pos];

      if (state === 'transparent' || state === 'positive') {
        continue;
      } else {
        shipMapName = `${orientation}_${TRAVERSE_ASSOC[shipSize][j]}`;
        break;
      }
    }
  }

  return shipMapName;
};

export const getShipMapName = (
  x: number,
  y: number,
  shipSize: number,
  orientation: 'v' | 'h',
  fieldData: Record<string, CellData>,
) => {
  const coord = orientation === 'v' ? y : x;

  const mapsThold = 11 - shipSize;
  const orientationIndex = -10 + shipSize;

  const possibleMaps: string[] = [...new Array(10).fill(null)].map((_, i) =>
    i >= mapsThold ? `${orientation}_${orientationIndex + i}` : `${orientation}_0`,
  );

  for (let i = mapsThold - 1; i >= 0; i--) {
    possibleMaps[i] = traverseShip({ x, y, offset: i }, shipSize, orientation, fieldData);
  }

  return possibleMaps[coord];
};

interface GetShip4Data {
  fieldData: Record<string, CellData>;
  shipOrientation: 'h' | 'v';
  shipSize: number;
}

export const calcShip = (pos: string, data: GetShip4Data): Record<string, CellData> | boolean => {
  const { fieldData, shipOrientation, shipSize } = data;
  const [x, y] = pos.split('_').map((str) => +str);

  const currentShipMap = SHIP_MAPS[shipSize][getShipMapName(x, y, shipSize, shipOrientation, fieldData)];
  const positionedToField = currentShipMap.map(({ x: dX, y: dY }) => findPositions([x, y], [dX, dY]));

  if (preventPlacing(positionedToField, fieldData)) return false;

  return Object.fromEntries(positionedToField.map(([tX, tY], i) => feedData(currentShipMap, [tX, tY], i)));
};
