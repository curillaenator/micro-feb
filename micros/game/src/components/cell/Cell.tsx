import React, { FC } from 'react';
import cn from 'classnames';

import { getOverlayedShip, lastHoveredShipUnhover, lastHoveredShipPlace } from '@src/utils';
import { getShip4 } from '@src/assets';

import type { CellProps } from './interfaces';
import styles from './cell.module.scss';

export const Cell: FC<CellProps> = (props) => {
  const { x, y, fieldData, shipOrientation, lastHoveredShip, setHoveredCell, setLastHoveredShip, cellHandler } = props;
  const pos = `${x}_${y}`;

  return (
    <div
      className={cn(styles.cell, {
        [styles.cell_bt]: y > 0,
        [styles.cell_bl]: x > 0,
      })}
      onMouseEnter={() => {
        setHoveredCell(fieldData[pos]);

        const ship = getShip4(pos, { fieldData, shipOrientation });

        if (typeof ship !== 'boolean') {
          const overlayedShip = getOverlayedShip(ship, fieldData);

          setLastHoveredShip(overlayedShip);
          cellHandler(overlayedShip);
        }
      }}
      onMouseLeave={() => {
        if (!lastHoveredShip) return;

        cellHandler(lastHoveredShipUnhover(lastHoveredShip, fieldData));
        setLastHoveredShip(null);
      }}
      onClick={() => {
        if (!lastHoveredShip) return;

        cellHandler(lastHoveredShipPlace(lastHoveredShip));
        setLastHoveredShip(null);
      }}
    >
      <div className={cn(styles.circle, styles[`circle_${fieldData[pos].state}`])} />
    </div>
  );
};
