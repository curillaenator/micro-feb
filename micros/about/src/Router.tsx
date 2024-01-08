import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

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
    element: (
      <Suspense fallback={'Подождите...'}>
        <LazyAbout />
      </Suspense>
    ),
    // children: [
    //   {
    //     path: '/about/main',
    //     element: (
    //       <Suspense fallback={'Подождите...'}>
    //         <LazyAbout />
    //       </Suspense>
    //     ),
    //   },
    //   {
    //     path: '/about/good',
    //     element: <div>Good</div>,
    //   },
    // ],
  },
];

export default exposedRoutes;
