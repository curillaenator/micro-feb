import React, { FC } from 'react';
// import { setHeader } from '@microfeb/global-stores';
// import { useNavigate } from 'react-router-dom';

import Heart from '@src/assets/heart.svg';

const About: FC = () => {
  // const navigate = useNavigate();

  // useEffect(() => {

  //   return () => {
  //     setHeader(null);
  //   };
  // }, []);

  return (
    <div data-testid='App.Container'>
      <h1>About us</h1>

      <Heart data-testid='Icon' width='56px' height='56px' color='orange' />
      <Heart data-testid='Icon' width='56px' height='56px' color='orange' />
    </div>
  );
};

export default About;
