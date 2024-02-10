import { CellData } from '@src/types';

export const getOverlayedShip = (ship: Record<string, CellData>, fieldData: Record<string, CellData>) =>
  Object.fromEntries(
    Object.entries(ship)
      .filter(([_, v]) => v.x >= 0 && v.y >= 0 && v.x < 10 && v.y < 10)
      .map(([k, v]) => [
        k,
        {
          ...v,
          state:
            fieldData[k].state === 'transparent' || fieldData[k].state === 'positive' ? v.state : fieldData[k].state,
        },
      ]),
  );
