import React, { FC } from 'react';
import { useUnit } from 'effector-react';

import { Button } from '@uikit/button';
import { Field } from '@src/components/field';

import { $game, gameReset, setCellsP1, setCellsP2 } from '@src/store';
import styles from './game.module.scss';

const Game: FC = () => {
  const { p1, p2 } = useUnit($game);

  return (
    <>
      <div className={styles.game}>
        <Field fieldData={p1} setCells={setCellsP1} />
        {/* <Field fieldData={p2} setCells={setCellsP2} /> */}
        <div style={{ width: '100%', aspectRatio: '1 / 1' }} />
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
