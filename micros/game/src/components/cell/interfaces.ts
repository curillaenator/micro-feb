import type { EventCallable } from 'effector';
import { CellData } from '@src/types';

export interface CellProps extends CellData {
  shipOrientation: 'h' | 'v';
  fieldData: Record<string, CellData>;
  setHoveredCell: React.Dispatch<React.SetStateAction<CellData>>;
  lastHoveredShip: Record<string, CellData> | null;
  setLastHoveredShip: React.Dispatch<React.SetStateAction<Record<string, CellData>>>;
  cellHandler: EventCallable<Record<string, CellData>>;
}
