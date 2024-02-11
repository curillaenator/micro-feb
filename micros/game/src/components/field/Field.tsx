import React, { FC, useState, useEffect, useRef } from 'react';
import { Cell } from '@src/components/cell';

import { getOverlayedShip, lastHoveredShipUnhover } from '@src/utils';
import { calcShip } from '@src/assets';

import { FIELD_GENERATOR, SHIPS } from '@src/constants';
import type { CellData } from '@src/types';
import type { FiledProps } from './interfaces';

import styles from './field.module.scss';

export const Field: FC<FiledProps> = (props) => {
  const { fieldData, setCells } = props;

  const [shipIndex, setShipIndex] = useState<number>(0);

  const [lastHoveredShip, setLastHoveredShip] = useState<Record<string, CellData>>(null);
  const [hoveredCell, setHoveredCell] = useState<CellData>(null);
  const [shipOrientation, setShipOrientation] = useState<'h' | 'v'>('h');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const clearLastHoveredShip = () => {
    if (!lastHoveredShip) return;

    setCells(lastHoveredShipUnhover(lastHoveredShip, fieldData));
    setLastHoveredShip(null);
  };

  const onShipOrient = () => {
    if (!hoveredCell) return;

    clearLastHoveredShip();
    setShipOrientation((prev) => (prev === 'h' ? 'v' : 'h'));

    const ship = calcShip(`${hoveredCell.x}_${hoveredCell.y}`, {
      fieldData,
      shipSize: SHIPS[shipIndex],
      shipOrientation: shipOrientation === 'v' ? 'h' : 'v',
    });

    if (typeof ship !== 'boolean') {
      const overlayedShip = getOverlayedShip(ship, fieldData);

      setLastHoveredShip(overlayedShip);
      setCells(overlayedShip);
    }
  };

  useEffect(() => {
    if (isFocused) containerRef.current.focus();
  }, [isFocused]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.field}
      onMouseLeave={() => {
        setHoveredCell(null);
        setIsFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.code === 'Space') onShipOrient();
      }}
    >
      {FIELD_GENERATOR.map(([pos, data]) => (
        <Cell
          {...data}
          key={pos}
          fieldData={fieldData}
          shipOrientation={shipOrientation}
          setHoveredCell={setHoveredCell}
          lastHoveredShip={lastHoveredShip}
          setLastHoveredShip={setLastHoveredShip}
          setCells={setCells}
          isFieldFocused={isFocused}
          setIsFieldFocused={setIsFocused}
          shipIndex={shipIndex}
          setNextShip={() => setShipIndex((prev) => prev + 1)}
        />
      ))}
    </div>
  );
};
