import { cleanup, render, fireEvent, screen } from '@testing-library/react';
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

test('Header', () => {
  render(<App />);
  expect(document.getElementsByClassName('header')[0]).toBeInTheDocument();
  cleanup();
});

describe('testing registration page routing (useNAvigate())', () => {
  test('Renders the RegistrationPage component', async () => {
    render(<App />);
    const buttons = document.getElementsByClassName('header__button_signup');
    const buttonElement = buttons[0];
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(await screen.findByText('Registration Form')).toBeInTheDocument();
    cleanup();
  });
  test('Renders the LogInPage component', async () => {
    render(<App />);
    const button = screen.findByText('login');
    const buttonElement = await button;
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(await screen.findByText('Account Login')).toBeInTheDocument();
    cleanup();
  });
});
