import { PropsWithChildren, HTMLAttributes } from 'react';

export interface ButtonProps extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  borderRadius?: number;
  outline?: number;
  colorMode?: 'light' | 'dark';
  appearance?: 'solid';
  fullwidth?: boolean;
}
