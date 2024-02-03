import React, { FC } from 'react';
import type { EventCallable } from 'effector';

import { Cell } from '@src/components/cell';

import { FIELD_GENERATOR } from '@src/constants';
import type { CellData } from '@src/types';
import styles from './field.module.scss';

interface FiledProps {
  setCells: EventCallable<Record<string, CellData>>;
}

export const Field: FC<FiledProps> = (props) => {
  const { setCells } = props;

  return (
    <div className={styles.field}>
      {FIELD_GENERATOR.map(([pos, data]) => (
        <Cell key={pos} {...data} setCells={setCells} />
      ))}
    </div>
  );
};
