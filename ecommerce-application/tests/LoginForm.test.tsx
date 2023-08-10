import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../src/components/forms/loginForm/loginForm';
import { errorsMessage } from '../src/types/errorTypes';

beforeEach(() => {
  render(<LoginForm />);
});

afterEach(() => {
  cleanup();
});

describe('Login form exists in the DOM', () => {
  test('Password field exists in the DOM', () => {
    expect(
      screen.getByPlaceholderText<HTMLInputElement>('Password')
    ).toBeInTheDocument();
  });

  test('Email field exists in the DOM', () => {
    expect(
      screen.getByPlaceholderText<HTMLInputElement>('Email')
    ).toBeInTheDocument();
  });

  test('Button exists in the DOM', () => {
    expect(screen.getByRole<HTMLButtonElement>('button')).toBeInTheDocument();
  });
});

describe('Email validation', () => {
  test('Email is required', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Password'));

    expect(screen.getByTestId<HTMLSpanElement>('email-error').textContent).toBe(
      errorsMessage.EMAIL_REQUIRED
    );
  });

  test('Email must contain @', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Email'),
      'some'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Password'));

    expect(screen.getByTestId<HTMLSpanElement>('email-error').textContent).toBe(
      errorsMessage.EMAIL_AT_SYMBOL
    );
  });

  test('Email must contain domain', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Email'),
      'some@'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Password'));

    expect(screen.getByTestId<HTMLSpanElement>('email-error').textContent).toBe(
      errorsMessage.EMAIL_DOMAIN_EXIST
    );
  });

  test('Email must be valid ', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Email'),
      'some@example'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Password'));

    expect(screen.getByTestId<HTMLSpanElement>('email-error').textContent).toBe(
      errorsMessage.EMAIL_VALID
    );
  });
});

describe('Password validation', () => {
  test('Password is required', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Password'));
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_REQUIRED);
  });

  test('Password length', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Password'),
      'some'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_LENGTH);
  });

  test('Password must contain uppercase letter', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Password'),
      'asdasdasd'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_UPPERCASE_LETTER);
  });

  test('Password must contain lowercase letter', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Password'),
      'ASDASDASD'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_LOWERCASE_LETTER);
  });

  test('Password must contain digit', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Password'),
      'ASDASDasd'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_DIGIT);
  });

  test('Password must contain special character', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('Password'),
      'ASDasd123'
    );
    await user.click(screen.getByPlaceholderText<HTMLInputElement>('Email'));

    expect(
      screen.getByTestId<HTMLSpanElement>('password-error').textContent
    ).toBe(errorsMessage.PASSWORD_SPECIAL_CHARACTER);
  });
});
