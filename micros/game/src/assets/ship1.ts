import { CellData } from '@src/types';

const SHIP_1 = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export const getShip1 = (pos: string): Record<string, CellData> => {
  const [x, y] = pos.split('_').map((str) => +str);

  return Object.fromEntries(
    SHIP_1.map(([dX, dY]) => [x + dX, y + dY])
      .filter(([cX, cY]) => cX >= 0 && cX < 10 && cY >= 0 && cY < 10)
      .map(([cX, cY]) => [
        `${cX}_${cY}`,
        {
          x: cX,
          y: cY,
          state: cX === x && cY === y ? 'primary' : 'neutral',
        },
      ]),
  );
};
