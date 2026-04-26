import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo list heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /todo list/i });
  expect(heading).toBeInTheDocument();
});
