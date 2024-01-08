import type { ReactNode } from 'react';
import { createEvent, createStore } from 'effector';

interface LayoutRoute {
  id: string;
  to: string;
  title: string;
}

interface LayoutStore {
  logo: ReactNode;
  header: ReactNode;
  menu: LayoutRoute[];
}

export const setHeader = createEvent<ReactNode>();
export const setLogo = createEvent<ReactNode>();

export const setMenu = createEvent<LayoutRoute[]>();
export const onSetRoute = createEvent<LayoutRoute>();

export const $layout = createStore<LayoutStore>({
  header: null,
  logo: null,
  menu: [],
});

$layout
  .on(setHeader, (state, headerNode) => ({ ...state, header: headerNode }))
  .on(setLogo, (state, logoNode) => ({ ...state, logo: logoNode }))
  .on(setMenu, (state, menu) => ({ ...state, menu }))
  .on(onSetRoute, (state, menuRoute) => ({
    ...state,
    menu: [...state.menu, menuRoute],
  }));
