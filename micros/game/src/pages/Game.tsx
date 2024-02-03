import React, { FC, useEffect } from 'react';

import { Field } from '@src/components/field';
import { $field, setCells } from '@src/store';

import { FIELD_GENERATOR } from '@src/constants';
import styles from './game.module.scss';

const Game: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <Field setCells={setCells} />

        <Field setCells={setCells} />
      </div>
    </div>
  );
};

export default Game;
