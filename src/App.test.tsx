import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders top nav with Home, Todos, and Pong links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /todos/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /pong/i })).toBeInTheDocument();
});
