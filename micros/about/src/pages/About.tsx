import React, { FC } from 'react';

import Heart from '@src/assets/heart.svg';

const About: FC = () => {
  return (
    <div data-testid='App.Container'>
      <h1>About us</h1>

      <Heart data-testid='Icon' width='56px' height='56px' color='orange' />
    </div>
  );
};

export default About;
