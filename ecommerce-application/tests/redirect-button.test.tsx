import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../src/components/app';

describe('RedirectButton', () => {
  test('should change main page to registration when button is clicked', () => {
    render(<App></App>);
    const registrationButton = screen.getByText('Click to Register');
    expect(registrationButton).toBeInTheDocument();
    fireEvent.click(registrationButton);
    expect(window.location.href).toBe('http://localhost/register');
    cleanup();
  });
  test('should change main page to LogIn when button is clicked', () => {
    render(<App></App>);
    const loginButton = screen.getByText('Click to LogIn');
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(window.location.href).toBe('http://localhost/login');
    cleanup();
  });
});
