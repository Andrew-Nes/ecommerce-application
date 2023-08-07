/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../src/components/container';

test('renders title', () => {
  render(<Container title={'New Container'} />);
  const titleElement = screen.getByText(/New Container/i);
  expect(titleElement).toBeInTheDocument();
  React;
});
