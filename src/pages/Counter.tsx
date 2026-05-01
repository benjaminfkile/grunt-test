import React, { useState } from 'react';
import {
  Button,
  Title1,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    alignItems: 'center',
  },
  count: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
  },
  buttons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
});

function Counter() {
  const styles = useStyles();
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <Title1 as="h1">Counter</Title1>
      <Text className={styles.count}>{count}</Text>
      <div className={styles.buttons}>
        <Button appearance="primary" onClick={() => setCount(c => c + 1)}>
          Increment
        </Button>
        <Button appearance="primary" onClick={() => setCount(c => c - 1)}>
          Decrement
        </Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
      </div>
    </div>
  );
}

export default Counter;
