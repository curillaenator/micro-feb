import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LazyGame } from './pages';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <div>This is game in mfe app</div>,
  },
]);

const exposedRoutes = [
  {
    path: '/game',
    name: 'Game',
    element: (
      <Suspense fallback={'Подождите...'}>
        <LazyGame />
      </Suspense>
    ),
  },
];

export default exposedRoutes;
