import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LazyAbout } from './pages';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <div>This is mfe app</div>,
  },
]);

const exposedRoutes = [
  {
    path: '/about',
    name: 'About',
    children: [
      {
        path: '/about/page',
        name: '* About page 1',
        index: true,
        element: (
          <Suspense fallback={'Подождите...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/about/good',
        name: '* About page 1',
        element: <div>Good</div>,
      },
    ],
  },
];

export default exposedRoutes;
