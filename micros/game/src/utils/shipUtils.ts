import { CellData } from '@src/types';

export const feedData = (currentShipMap: CellData[], [tX, tY]: [number, number], i: number) => [
  `${tX}_${tY}`,
  { x: tX, y: tY, state: currentShipMap[i].state },
];

export const findPositions = ([x, y]: [number, number], [dX, dY]: [number, number]) => [x + dX, y + dY];

export const preventPlacing = (positioned: number[][], shipSize: number, fieldData: Record<string, CellData>) => {
  const isOwelapedByExistingShip = positioned.some(([cX, cY]) => fieldData[`${cX}_${cY}`]?.state === 'primary');

  const placingSize = positioned.reduce(
    (acc, [cX, cY]) => (fieldData[`${cX}_${cY}`]?.state === 'positive' ? acc + 1 : acc),
    0,
  );

  console.log(placingSize, shipSize);

  return { placingSize, isOwelapedByExistingShip };
};
