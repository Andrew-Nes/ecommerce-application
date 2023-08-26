import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../../src/components/Forms/RegistrationForm/RegistrationForm';
import { errorsMessage } from '../../src/types/formTypes';

jest.mock('../../src/api/apiFunctions', () => ({
  loginClient: jest.fn(),
}));

jest.mock('../../src/api/apiFunctions', () => ({
  CreateCustomer: jest.fn(),
}));

const registrationTest = () => {};

afterEach(() => {
  cleanup();
});

describe('Street validation', () => {
  test('Street is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('streetShipping'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('streetShippingError').textContent
    ).toBe(errorsMessage.STREET_REQUIRED);
  });
});

describe('City validation', () => {
  test('City is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('cityShipping'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('cityShippingError').textContent
    ).toBe(errorsMessage.CITY_REQUIRED);
  });

  test('City must not contain numbers', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('cityShipping'), '123');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('cityShippingError').textContent
    ).toBe(errorsMessage.CITY_NUMBERS);
  });

  test('City must not contain special character', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('cityShipping'),
      'city$'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('cityShippingError').textContent
    ).toBe(errorsMessage.CITY_SPECIAL_CHARACTER);
  });
});

describe('Postal code validation', () => {
  test('Postal code is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('postalCodeShipping'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('postalCodeShippingError')
        .textContent
    ).toBe(errorsMessage.POSTAL_CODE_REQUIRED);
  });

  test('Postal code format', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('postalCodeShipping'),
      '123'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('postalCodeShippingError')
        .textContent
    ).toBe(errorsMessage.POSTAL_CODE_FORMAT);
  });
});

describe('Street validation', () => {
  test('Street is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('streetBilling'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('streetBillingError').textContent
    ).toBe(errorsMessage.STREET_REQUIRED);
  });
});

describe('City validation', () => {
  test('City is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('cityBilling'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('cityBillingError').textContent
    ).toBe(errorsMessage.CITY_REQUIRED);
  });

  test('City must not contain numbers', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('cityBilling'), '123');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('cityBillingError').textContent
    ).toBe(errorsMessage.CITY_NUMBERS);
  });

  test('City must not contain special character', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('cityBilling'),
      'city$'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('cityBillingError').textContent
    ).toBe(errorsMessage.CITY_SPECIAL_CHARACTER);
  });
});

describe('Postal code validation', () => {
  test('Postal code is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('postalCodeBilling'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('postalCodeBillingError')
        .textContent
    ).toBe(errorsMessage.POSTAL_CODE_REQUIRED);
  });

  test('Postal code format', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('postalCodeBilling'),
      '123'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('postalCodeBillingError')
        .textContent
    ).toBe(errorsMessage.POSTAL_CODE_FORMAT);
  });
});
