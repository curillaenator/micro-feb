const LINES: Record<number, number[]> = {
  4: [-1, 0, 1, 2, 3, 4],
  3: [-1, 0, 1, 2, 3],
  2: [-1, 0, 1, 2],
  1: [-1, 0, 1],
};

export const getNCellShip = (n: number, offset: number = 0, orientation: 'h' | 'v') =>
  LINES[n]
    .map((coord1) =>
      [-1, 0, 1].map((coord2) => ({
        x: orientation === 'v' ? coord2 : coord1 + offset,
        y: orientation === 'v' ? coord1 + offset : coord2,
        state: coord2 === 0 && coord1 >= 0 && coord1 < n ? 'positive' : 'transparent',
      })),
    )
    .flat();
