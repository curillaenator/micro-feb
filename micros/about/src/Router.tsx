import React, { FC, Suspense } from 'react';
import { LazyAbout } from './pages';

const Fallback: FC = () => <div>Подождите...</div>;

export const routes = [
  {
    path: '/',
    element: <div>About page mfe</div>,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={<Fallback />}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
