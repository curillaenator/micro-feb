import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { LazyAbout } from './pages';

const routes = [
  {
    path: '/',
    element: (
      <div>
        <h1>About page mfe</h1>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Подождите...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
