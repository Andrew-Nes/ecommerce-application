import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../../src/components/forms/RegistrationForm/RegistrationForm';
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

describe('Email validation', () => {
  test('Email is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    await user.click(screen.getByTitle<HTMLInputElement>('password'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('emailError').textContent
    ).toBe(errorsMessage.EMAIL_REQUIRED);
  });

  test('Email must contain @', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('email'), 'some');
    await user.click(screen.getByTitle<HTMLInputElement>('password'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('emailError').textContent
    ).toBe(errorsMessage.EMAIL_AT_SYMBOL);
  });

  test('Email must contain domain', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('email'), 'some@');
    await user.click(screen.getByTitle<HTMLInputElement>('password'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('emailError').textContent
    ).toBe(errorsMessage.EMAIL_DOMAIN_EXIST);
  });

  test('Email must be valid', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('email'), 'some@some');
    await user.click(screen.getByTitle<HTMLInputElement>('password'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('emailError').textContent
    ).toBe(errorsMessage.EMAIL_VALID);
  });
});

describe('Password validation', () => {
  test('Password is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('password'));
    await user.click(screen.getByTitle<HTMLInputElement>('email'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_REQUIRED);
  });

  test('Password length', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('password'), 'some');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_LENGTH);
  });

  test('Password must contain uppercase letter', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('password'),
      'asdasdasd'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_UPPERCASE_LETTER);
  });

  test('Password must contain lowercase letter', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('password'),
      'ASDASDASD'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_LOWERCASE_LETTER);
  });

  test('Password must contain digit', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('password'),
      'ASDASDasd'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_DIGIT);
  });

  test('Password must contain special character', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('password'),
      'ASDasd123'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('passwordError').textContent
    ).toBe(errorsMessage.PASSWORD_SPECIAL_CHARACTER);
  });
});

describe('First name validation', () => {
  test('First name is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));
    await user.click(screen.getByTitle<HTMLInputElement>('lastName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('firstNameError').textContent
    ).toBe(errorsMessage.FIRST_NAME_REQUIRED);
  });

  test('First name must not contain special character', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('firstName'), 'name$');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('firstNameError').textContent
    ).toBe(errorsMessage.FIRST_NAME_SPECIAL_CHARACTER);
  });

  test('First name must not contain numbers', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('firstName'),
      'name777'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('firstNameError').textContent
    ).toBe(errorsMessage.FIRST_NAME_NUMBERS);
  });
});

describe('Last name validation', () => {
  test('Last name is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('lastName'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('lastNameError').textContent
    ).toBe(errorsMessage.LAST_NAME_REQUIRED);
  });

  test('Last name must not contain special character', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('lastName'), 'name$');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('lastNameError').textContent
    ).toBe(errorsMessage.LAST_NAME_SPECIAL_CHARACTER);
  });

  test('Last name must not contain numbers', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(screen.getByTitle<HTMLInputElement>('lastName'), 'name777');
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('lastNameError').textContent
    ).toBe(errorsMessage.LAST_NAME_NUMBERS);
  });
});

describe('Date of birth validation', () => {
  test('Date of birth is required', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.click(screen.getByTitle<HTMLInputElement>('dateOfBirth'));
    await user.click(screen.getByTitle<HTMLInputElement>('firstName'));

    expect(
      screen.getByTitle<HTMLParagraphElement>('dateOfBirthError').textContent
    ).toBe(errorsMessage.DATE_OF_BIRTH_REQUIRED);
  });

  test('Date of birth must be 13 years of age or older', async () => {
    render(<RegistrationForm logIn={registrationTest} />);
    const user = userEvent.setup();
    await user.type(
      screen.getByTitle<HTMLInputElement>('dateOfBirth'),
      '2018-07-22'
    );
    await user.click(screen.getByTitle<HTMLInputElement>('email'));
    expect(
      screen.getByTitle<HTMLParagraphElement>('dateOfBirthError').textContent
    ).toBe(errorsMessage.DATE_OF_BIRTH_AGE);
  });
});
