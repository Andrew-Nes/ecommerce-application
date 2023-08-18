import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../src/components/app';

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

test('Header', () => {
  expect(document.getElementsByClassName('header')[0]).toBeInTheDocument();
});

describe('testing registration page routing (useNAvigate())', () => {
  test('Renders the RegistrationPage component', async () => {
    const button = screen.findByText('Register');
    const buttonElement = await button;
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(
      document.getElementsByClassName('registration-page')[0]
    ).toBeInTheDocument();
  });
  test('Renders the LogInPage component', async () => {
    const button = screen.findByText('LogIn');
    const buttonElement = await button;
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(
      document.getElementsByClassName('login-page')[0]
    ).toBeInTheDocument();
  });
});
