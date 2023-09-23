import { cleanup, render, screen } from '@testing-library/react';
import ButtonAddRemove from '../src/components/ButtonAddRemove/ButtonAddRemove';
import React from 'react';

jest.mock('../src/utils/cartContext.ts', () => ({
  useCartContext: () => ({
    cartContextValue: 0,
    updateCartContextValue: jest.fn(),
  }),
}));

jest.mock('../src/api/apiFunctions.ts', () => ({
  GetCart: jest.fn(),
  CartUpdateFunction: jest.fn(),
  GetActiveCArt: jest.fn(),
  AddProductToCart: jest.fn(),
}));
const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation(() => {});

describe('testing rendering button add', () => {
  test('Renders add button', async () => {
    render(<ButtonAddRemove id="1234567890" />);
    const buttonElement = screen.getByText('ADD TO CART');
    expect(buttonElement).toBeInTheDocument();
    cleanup();
  });
});
