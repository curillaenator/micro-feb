import React, { FC } from 'react';
import cn from 'classnames';
import { Corners } from '@uikit/smooth-rect';

import type { ButtonProps } from './interfaces';
import styles from './styles.module.scss';

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    borderRadius = 20,
    outline = 0,
    appearance = 'solid',
    colorMode = 'light',
    fullwidth = false,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type='button'
      style={{ borderRadius }}
      className={cn(styles.button, styles[`_${appearance}_${colorMode}`], {
        [styles._fullwidth]: fullwidth,
      })}
    >
      <Corners stroke={outline} borderRadius={borderRadius} />
      {children}
    </button>
  );
};
