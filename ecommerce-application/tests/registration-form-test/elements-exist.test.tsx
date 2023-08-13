import { cleanup, render, screen } from '@testing-library/react';
import RegistrationForm from '../../src/components/forms/RegistrationForm/RegistrationForm';

beforeEach(() => {
  render(<RegistrationForm />);
});

afterEach(() => {
  cleanup();
});

describe('Registration form exists in the DOM', () => {
  test('Email field exists in the DOM', () => {
    expect(screen.getByTitle<HTMLInputElement>('email')).toBeInTheDocument();
  });

  test('Password field exists in the DOM', () => {
    expect(screen.getByTitle<HTMLInputElement>('password')).toBeInTheDocument();
  });

  test('First Name field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('firstName')
    ).toBeInTheDocument();
  });

  test('Last Name field exists in the DOM', () => {
    expect(screen.getByTitle<HTMLInputElement>('lastName')).toBeInTheDocument();
  });

  test('Date of birth field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('dateOfBirth')
    ).toBeInTheDocument();
  });

  test('Default shipping address checkbox exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('defaultShippingAddress')
    ).toBeInTheDocument();
  });

  test('Street shipping field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('streetShipping')
    ).toBeInTheDocument();
  });

  test('City shipping field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('cityShipping')
    ).toBeInTheDocument();
  });

  test('Postal code shipping field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('postalCodeShipping')
    ).toBeInTheDocument();
  });

  test('Country shipping field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('countryShipping')
    ).toBeInTheDocument();
  });
  test('Set same address to billing checkbox exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('sameAddressToBilling')
    ).toBeInTheDocument();
  });

  test('Default billing address checkbox exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('defaultBillingAddress')
    ).toBeInTheDocument();
  });

  test('Street billing field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('streetBilling')
    ).toBeInTheDocument();
  });

  test('City billing field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('cityBilling')
    ).toBeInTheDocument();
  });

  test('Postal code billing field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('postalCodeBilling')
    ).toBeInTheDocument();
  });

  test('Country billing field exists in the DOM', () => {
    expect(
      screen.getByTitle<HTMLInputElement>('countryBilling')
    ).toBeInTheDocument();
  });

  test('Button exists in the DOM', () => {
    expect(screen.getByRole<HTMLButtonElement>('button')).toBeInTheDocument();
  });
});
