import { cleanup, render, screen } from '@testing-library/react';
import ProductPage from '../src/components/Pages/ProductPage/ProductPage';

jest.mock('../src/api/apiFunctions', () => ({
  getProduct: jest.fn(() => {
    return { body: {} };
  }),
}));

jest.mock('../src/components/Slider/Slider.tsx', () => () => {
  return <div className="slider">Slider here</div>;
});

afterEach(() => {
  cleanup();
});

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
