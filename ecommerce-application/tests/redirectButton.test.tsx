import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../src/components/App';
import React from 'react';

jest.mock('../src/api/apiFunctions', () => ({
  loginClient: jest.fn(),
}));

jest.mock('../src/api/apiFunctions', () => ({
  CreateCustomer: jest.fn(),
}));

jest.mock('../src/components/Pages/ProductPage/ProductPage.tsx', () => {
  const MockedComponent = () => {
    return <div>Mocked Child Component</div>;
  };
  return {
    __esModule: true,
    default: MockedComponent,
  };
});

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation(() => {});

describe('RedirectButton', () => {
  test('should change main page to registration when button is clicked', async () => {
    render(<App></App>);
    const button = screen.findAllByText('sign up');
    const buttonElement = await button;
    expect(buttonElement[0]).toBeInTheDocument();
    fireEvent.click(buttonElement[0]);
    expect(window.location.href).toBe('http://localhost/register');
    cleanup();
  });
  test('should change main page to LogIn when button is clicked', async () => {
    render(<App />);
    const button = screen.findAllByText('login');
    const buttonElement = await button;
    expect(buttonElement[0]).toBeInTheDocument();
    fireEvent.click(buttonElement[0]);
    expect(window.location.href).toBe('http://localhost/login');
    cleanup();
  });
});
