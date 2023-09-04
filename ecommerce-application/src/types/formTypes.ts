enum errorsMessage {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_VALID = 'Email address must be a valid address: user@example.com',
  EMAIL_DOMAIN_EXIST = 'Email must contain a domain name: @example.com',
  EMAIL_AT_SYMBOL = 'Email must contain an "@" symbol',
  EMAIL_WHITESPACE = 'Email must not contain whitespace',
  PASSWORD_LENGTH = 'Password should have at least 8 characters',
  PASSWORD_UPPERCASE_LETTER = 'Password must contain at least 1 Latin uppercase letter',
  PASSWORD_LOWERCASE_LETTER = 'Password must contain at least 1 Latin lowercase letter',
  PASSWORD_DIGIT = 'Password must contain at least 1 digit',
  PASSWORD_SPECIAL_CHARACTER = 'Password must contain at least 1 special character: !@#$%^&*',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_WHITESPACE = 'Password must not contain whitespace',
  FIRST_NAME_REQUIRED = 'First Name is required',
  FIRST_NAME_ONE_CHARACTER = 'First name must contain at least one character',
  FIRST_NAME_SPECIAL_CHARACTER = 'First name must not contain special characters',
  FIRST_NAME_NUMBERS = 'First Name must not contain numbers',
  LAST_NAME_REQUIRED = 'Last Name is required',
  LAST_NAME_ONE_CHARACTER = 'Last name must contain at least one character',
  LAST_NAME_SPECIAL_CHARACTER = 'Last Name must not contain special characters',
  LAST_NAME_NUMBERS = 'Last Name must not contain numbers',
  DATE_OF_BIRTH_REQUIRED = 'Field is empty or invalid date entered',
  DATE_OF_BIRTH_AGE = 'You must be 13 years of age or older',
  STREET_REQUIRED = 'Street is required',
  STREET_ONE_CHARACTER = 'Street must contain at least one character',
  CITY_REQUIRED = 'City is required',
  CITY_ONE_CHARACTER = 'City must contain at least one character',
  CITY_SPECIAL_CHARACTER = 'City must not contain special characters',
  CITY_NUMBERS = 'City must not contain numbers',
  POSTAL_CODE_REQUIRED = 'Postal code is required',
  POSTAL_CODE_FORMAT = 'Must follow the format 12345 or 12345-1234!',
  WRONG_LOGIN = 'Wrong email or password',
  EXIST_EMAIL = 'This email address already exists in the system',
  TOAST_EMAIL_EXIST = 'This email address already exists in the system. Log in or use another email address.',
  TOAST_INVALID_INPUT = 'Invalid input that bypasses client-side validation.',
  TOAST_SERVER_ERROR = 'Server problems. Please try to register later.',
  CHANGE_PASSWORD_NOT_MATCH = 'The given current password does not match.',
}

enum serviceErrors {
  INVALID_CUSTOMER_CREDENTIALS = 400,
  DUPLICATE_FIELD = 'There is already an existing customer with the provided email.',
  SERVICE_UNAVAILABLE = 503,
  BAD_GATEWAY = 502,
  INTERNAL_SERVER_ERROR = 500,
}

type PasswordType = 'password' | 'text';

export interface LoginProps {
  logIn: () => void;
}

export { errorsMessage, serviceErrors };
export type { PasswordType };
