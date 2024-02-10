import type { CellData } from '@src/types';

export const lastHoveredShipUnhover = (
  lastHoveredShip: Record<string, CellData>,
  fieldData: Record<string, CellData>,
) =>
  Object.fromEntries(
    Object.entries(lastHoveredShip).map(([k, v]) => [
      k,
      { ...fieldData[k], state: v.state === 'positive' ? 'transparent' : fieldData[k].state },
    ]),
  );
