import React, { FC, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//@ts-ignore
import aboutRoutes from 'about/Router';

import { App } from './app';

import './index.scss';

const Fallback: FC = () => <div>Подождите...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...aboutRoutes],
  },
]);

const root = createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  </React.StrictMode>,
);
