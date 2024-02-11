import type { EventCallable } from 'effector';
import { CellData } from '@src/types';

export interface FiledProps {
  setCells: EventCallable<Record<string, CellData>>;

  fieldData: Record<string, CellData>;
}
