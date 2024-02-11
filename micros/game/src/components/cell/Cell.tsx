import React, { FC } from 'react';
import cn from 'classnames';

import { getOverlayedShip, lastHoveredShipUnhover, lastHoveredShipPlace } from '@src/utils';
import { calcShip } from '@src/assets';

import { SHIPS } from '@src/constants';
import type { CellProps } from './interfaces';
import styles from './cell.module.scss';

export const Cell: FC<CellProps> = (props) => {
  const {
    x,
    y,
    fieldData,
    shipOrientation,
    lastHoveredShip,
    isFieldFocused,
    shipIndex,
    setHoveredCell,
    setLastHoveredShip,
    setIsFieldFocused,
    setNextShip,
    setCells,
  } = props;
  const pos = `${x}_${y}`;

  return (
    <div
      className={cn(styles.cell, { [styles.cell_bt]: y > 0, [styles.cell_bl]: x > 0 })}
      onMouseEnter={() => {
        if (!isFieldFocused) setIsFieldFocused(true);

        setHoveredCell(fieldData[pos]);

        const ship = calcShip(pos, { fieldData, shipOrientation, shipSize: SHIPS[shipIndex] });

        if (typeof ship !== 'boolean') {
          const overlayedShip = getOverlayedShip(ship, fieldData);

          setLastHoveredShip(overlayedShip);
          setCells(overlayedShip);
        }
      }}
      onMouseLeave={() => {
        if (!lastHoveredShip) return;

        setLastHoveredShip(null);
        setCells(lastHoveredShipUnhover(lastHoveredShip, fieldData));
      }}
      onClick={() => {
        if (!lastHoveredShip) return;

        setCells(lastHoveredShipPlace(lastHoveredShip));
        setLastHoveredShip(null);
        setNextShip();
      }}
    >
      <div className={cn(styles.circle, styles[`circle_${fieldData[pos].state}`])} />
    </div>
  );
};
