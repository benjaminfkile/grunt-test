import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders top nav with Home, Todos, and Pong links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const nav = within(screen.getByRole('navigation'));
  expect(nav.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(nav.getByRole('link', { name: /todos/i })).toBeInTheDocument();
  expect(nav.getByRole('link', { name: /pong/i })).toBeInTheDocument();
});
