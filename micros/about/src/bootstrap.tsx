import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './Router';

const Fallback: FC = () => <div>Подождите...</div>;

const router = createBrowserRouter(routes);

const root = createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  </React.StrictMode>,
);
