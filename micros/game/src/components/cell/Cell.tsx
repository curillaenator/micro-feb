import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import type { EventCallable } from 'effector';
import cn from 'classnames';

import { $field, setCells } from '@src/store';

import type { CellData } from '@src/types';
import styles from './cell.module.scss';

interface CellProps extends CellData {
  isOnFire?: boolean;

  setCells: EventCallable<Record<string, CellData>>;
}

export const Cell: FC<CellProps> = (props) => {
  const { x, y } = props;
  const pos = `${x}_${y}`;

  const cellData = useUnit($field)[pos];
  const { isShip, isTouched } = cellData;

  return (
    <div
      className={cn(styles.cell, {
        [styles.cell_bt]: y > 0,
        [styles.cell_bl]: x > 0,
      })}
      onClick={() => {
        setCells({
          [pos]: { ...cellData, isShip: true },
        });
      }}
    >
      <div
        className={cn(styles.circle, styles.circle_transparent, {
          [styles.circle_primary]: isShip,
          [styles.circle_attention]: false,
          [styles.circle_danger]: false,
          [styles.circle_neutral]: false,
        })}
      />
    </div>
  );
};
