import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from '@src/app';
import mfeRoutes from '@src/mfeRoutes';

import './index.scss';

const root = document.querySelector('#root');

if (root) {
  const container = createRoot(root);

  container.render(
    <RouterProvider
      router={createBrowserRouter([{ path: '/', element: <App />, children: mfeRoutes }])}
      fallbackElement={<div>Подождите...</div>}
    />,
  );
}
