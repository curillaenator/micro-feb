import React, { FC } from 'react';
import cn from 'classnames';

import { useCorners } from './hooks/useCorners';

import { CORNERS, SVG_OVERLAP } from './constants';
import type { CornerProps } from './interfaces';
import styles from './styles.module.scss';

export const Corners: FC<CornerProps> = (props) => {
  const { id, borderRadius, stroke, path, borderPath, corners = CORNERS } = useCorners(props);

  return (
    <div className={styles.container}>
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' className={styles.svgInner}>
        <defs>
          <clipPath id={`corners-inner-polygons-${id}`}>
            <rect
              x={borderRadius - SVG_OVERLAP}
              y={0}
              height='100%'
              width={`calc(100% - 2 * ${borderRadius - SVG_OVERLAP}px)`}
            />

            <rect
              x={0}
              y={borderRadius - SVG_OVERLAP}
              width='100%'
              height={`calc(100% - 2 * ${borderRadius - SVG_OVERLAP}px)`}
            />
          </clipPath>
        </defs>

        <rect
          x={0}
          y={0}
          width='100%'
          height='100%'
          strokeWidth={stroke * 2}
          fill='var(--corners-bgc, blue)'
          stroke='var(--corners-bdc, red)'
          clipPath={`url(#corners-inner-polygons-${id})`}
        />
      </svg>

      {corners.map((corner) => (
        <svg
          key={corner}
          version='1.1'
          widths={borderRadius}
          height={borderRadius}
          viewBox={`0 0 ${borderRadius} ${borderRadius}`}
          shapeRendering='geometricPrecision'
          className={cn(styles.svgCorner, styles[`corner-${corner}`])}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d={path} fill='var(--corners-bgc, blue)' />

          <path d={borderPath} strokeWidth={stroke} stroke='var(--corners-bdc, red)' fill='none' />
        </svg>
      ))}
    </div>
  );
};
