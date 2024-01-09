import React, { FC } from 'react';
import cn from 'classnames';
import { useCorners } from './hooks/useCorners';

import { CORNERS } from './constants';
import type { CornerProps } from './interfaces';
import styles from './styles.module.scss';

export const Corners: FC<CornerProps> = (props) => {
  const { R, path, borderPath, commonSvgProps, stroke, corners = CORNERS } = useCorners(props);

  return (
    <div className={styles.container}>
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' className={styles.svgBg}>
        <defs>
          <clipPath id='corners-inner-polygons'>
            <rect x={R} y={0} height='100%' width={`calc(100% - 2 * ${R}px)`} />
            <rect x={0} y={R} width='100%' height={`calc(100% - 2 * ${R}px)`} />
          </clipPath>
        </defs>

        <rect
          x={0}
          y={0}
          width='100%'
          height='100%'
          clip-path='url(#corners-inner-polygons)'
          fill='var(--corners-bgc, blue)'
          stroke='var(--corners-bdc, red)'
          strokeWidth={stroke * 2}
        />
      </svg>

      {corners.map((corner) => (
        <svg {...commonSvgProps} key={corner} className={cn(styles.svgCorner, styles[`corner-${corner}`])}>
          <path d={path} fill='var(--corners-bgc, blue)' />
          <path d={borderPath} strokeWidth={stroke} stroke='var(--corners-bdc, red)' fill='none' />
        </svg>
      ))}
    </div>
  );
};
