import { cleanup, render, screen } from '@testing-library/react';
import ProductPage from '../src/components/Pages/ProductPage/ProductPage';
import React from 'react';

jest.mock('../src/api/apiFunctions', () => ({
  getProduct: jest.fn(() => {
    return { body: {} };
  }),
}));

jest.mock('../src/components/ButtonAddRemove/ButtonAddRemove.tsx', () => {
  const MockedButton = () => {
    return <div>Mocked Child Component</div>;
  };
  return {
    __esModule: true,
    default: MockedButton,
  };
});

jest.mock('../src/components/Slider/Slider.tsx', () => () => {
  return <div className="slider">Slider here</div>;
});

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {},
}));

jest.mock('../src/utils/cartContext.ts', () => ({
  useCartContext: () => ({
    cartContextValue: 0,
    updateCartContextValue: jest.fn(),
  }),
}));

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation(() => {});

describe('product page renders content if no product loaded', () => {
  test('if no price loaded renders text', () => {
    render(<ProductPage id="123456789" />);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  test('if no description loaded renders text', () => {
    render(<ProductPage id="123456789" />);
    expect(
      screen.getByText('No description for this product')
    ).toBeInTheDocument();
  });

  test('if no image loaded renders no image picture', () => {
    render(<ProductPage id="123456789" />);
    expect(screen.getByAltText('no image')).toBeInTheDocument();
  });
});
