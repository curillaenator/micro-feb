import type { CellData } from '@src/types';

export const lastHoveredShipPlace = (lastHoveredShip: Record<string, CellData>) =>
  Object.fromEntries(
    Object.entries(lastHoveredShip).map(([k, v]) => [
      k,
      { ...v, state: v.state === 'positive' ? 'primary' : 'neutral' },
    ]),
  ) as Record<string, CellData>;
