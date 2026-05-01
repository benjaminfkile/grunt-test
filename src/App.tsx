import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { makeStyles, tokens } from '@fluentui/react-components';
import './App.css';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Pong from './pages/Pong';
import Counter from './pages/Counter';

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  link: {
    color: tokens.colorNeutralForeground1,
    textDecorationLine: 'none',
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&.active': {
      backgroundColor: tokens.colorNeutralBackground1Selected,
      fontWeight: tokens.fontWeightSemibold,
    },
  },
});

function App() {
  const styles = useStyles();

  return (
    <div className="App">
      <nav className={styles.nav}>
        <NavLink to="/" end className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/todos" className={styles.link}>
          Todos
        </NavLink>
        <NavLink to="/pong" className={styles.link}>
          Pong
        </NavLink>
        <NavLink to="/counter" className={styles.link}>
          Counter
        </NavLink>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </div>
  );
}

export default App;
