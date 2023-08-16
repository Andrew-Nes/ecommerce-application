import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../src/components/forms/loginForm/loginForm';
import { errorsMessage } from '../src/types/formTypes';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

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

// describe('Failed login', () => {
//   test('Failed login message exists', async () => {
//     const user = userEvent.setup();
//     await user.type(
//       screen.getByPlaceholderText<HTMLInputElement>('Email'),
//       'login@example.com'
//     );
//     await user.type(
//       screen.getByPlaceholderText<HTMLInputElement>('Password'),
//       'exampleA1!'
//     );
//     await user.click(screen.getByRole<HTMLButtonElement>('button'));

//     expect(
//       screen.getByTestId<HTMLSpanElement>('email-error').textContent
//     ).toBe(errorsMessage.WRONG_LOGIN);
//   });

// });
