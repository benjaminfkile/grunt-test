import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Text,
  Title1,
  Body1,
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
  },
  blurb: {
    marginBottom: tokens.spacingVerticalM,
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: tokens.spacingHorizontalL,
  },
  cardLink: {
    textDecorationLine: 'none',
    color: 'inherit',
    display: 'block',
  },
  card: {
    height: '100%',
  },
});

function Home() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Title1 as="h1">Welcome to Grunt Demo</Title1>
      <Body1 className={styles.blurb}>
        A small playground showcasing features built one task at a time. Pick a
        demo below to get started.
      </Body1>
      <div className={styles.cards}>
        <Link to="/todos" className={styles.cardLink}>
          <Card className={styles.card}>
            <CardHeader
              header={<Text weight="semibold">Todos</Text>}
              description={
                <Text>Manage a simple todo list backed by local storage.</Text>
              }
            />
          </Card>
        </Link>
        <Link to="/pong" className={styles.cardLink}>
          <Card className={styles.card}>
            <CardHeader
              header={<Text weight="semibold">Pong</Text>}
              description={<Text>A classic Pong game (coming soon).</Text>}
            />
          </Card>
        </Link>
        <Link to="/counter" className={styles.cardLink}>
          <Card className={styles.card}>
            <CardHeader
              header={<Text weight="semibold">Counter</Text>}
              description={<Text>A simple counter with increment, decrement, and reset.</Text>}
            />
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Home;
