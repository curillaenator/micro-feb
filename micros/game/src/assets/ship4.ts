import { CellData } from '@src/types';

const LINE = [-1, 0, 1, 2, 3, 4];

const get4CellShip = (offset: number = 0, orientation: 'h' | 'v') =>
  LINE.map((coord1) =>
    [-1, 0, 1].map((coord2) => ({
      x: orientation === 'v' ? coord2 : coord1 + offset,
      y: orientation === 'v' ? coord1 + offset : coord2,
      state: coord2 === 0 && coord1 >= 0 && coord1 < 4 ? 'positive' : 'transparent',
    })),
  ).flat();

const SHIP_4 = Object.fromEntries([
  ...[0, -1, -2, -3].map((offsetY) => [`v_${Math.abs(offsetY)}`, get4CellShip(offsetY, 'v')]),
  ...[0, -1, -2, -3].map((offsetX) => [`h_${Math.abs(offsetX)}`, get4CellShip(offsetX, 'h')]),
]) as Record<string, CellData[]>;

const findPositions = ([x, y]: [number, number], [dX, dY]: [number, number]) => [x + dX, y + dY];

const feedData = (currentShipMap: CellData[], [tX, tY]: [number, number], i: number) => [
  `${tX}_${tY}`,
  { x: tX, y: tY, state: currentShipMap[i].state },
];

const preventPlacing = (positioned: number[][], fieldData: Record<string, CellData>) => {
  return positioned.some(([cX, cY]) => fieldData[`${cX}_${cY}`]?.state === 'primary');
};

const getMap = (y: number, orientation: 'v' | 'h') => {
  if (y === 9) return `${orientation}_3`;
  if (y === 8) return `${orientation}_2`;
  if (y === 7) return `${orientation}_1`;
  return `${orientation}_0`;
};

interface GetShip4Data {
  fieldData: Record<string, CellData>;
  shipOrientation: 'h' | 'v';
}

export const getShip4 = (pos: string, data: GetShip4Data): Record<string, CellData> | boolean => {
  const { fieldData, shipOrientation } = data;
  const [x, y] = pos.split('_').map((str) => +str);

  const currentShipMap = SHIP_4[getMap(shipOrientation === 'v' ? y : x, shipOrientation)];
  const positioned = currentShipMap.map(({ x: dX, y: dY }) => findPositions([x, y], [dX, dY]));

  if (preventPlacing(positioned, fieldData)) return false;

  return Object.fromEntries(positioned.map(([tX, tY], i) => feedData(currentShipMap, [tX, tY], i)));
};
