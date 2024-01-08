import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './Router';

import './index.scss';

const root = document.querySelector('#root');

if (root) {
  const container = createRoot(root);
  container.render(<RouterProvider router={router} fallbackElement={<div>Подождите...</div>} />);
}
