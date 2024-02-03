import { createEvent, createStore } from 'effector';

import { INITIAL_FIELD_STATE } from '@src/constants';
import type { CellData } from '@src/types';

export const setCells = createEvent<Record<string, CellData>>();

export const $field = createStore<Record<string, CellData>>(INITIAL_FIELD_STATE);

$field.on(setCells, (state, cells) => ({ ...state, ...cells }));
