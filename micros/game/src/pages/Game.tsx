import React, { FC } from 'react';
import { useUnit } from 'effector-react';

import { Button } from '@uikit/button';

import { gameReset } from '@src/store';

import { Field } from '@src/components/field';
import styles from './game.module.scss';

const Game: FC = () => {
  return (
    <>
      <div className={styles.game}>
        <Field player='p1' />
        <Field player='p2' />
      </div>

      <div className={styles.controls}>
        <Button id='reset-button' onClick={() => gameReset()}>
          Reset game
        </Button>
      </div>
    </>
  );
};

export default Game;
