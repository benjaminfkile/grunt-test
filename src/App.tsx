import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { makeStyles, tokens } from '@fluentui/react-components';
import './App.css';

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
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
