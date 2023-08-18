enum errorsMessage {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_VALID = 'Email address must be a valid address: user@example.com',
  EMAIL_DOMAIN_EXIST = 'Email must contain a domain name: @example.com',
  EMAIL_AT_SYMBOL = 'Email must contain an "@" symbol',
  PASSWORD_LENGTH = 'Password should have at least 8 characters',
  PASSWORD_UPPERCASE_LETTER = 'Password must contain at least 1 Latin uppercase letter',
  PASSWORD_LOWERCASE_LETTER = 'Password must contain at least 1 Latin lowercase letter',
  PASSWORD_DIGIT = 'Password must contain at least 1 digit',
  PASSWORD_SPECIAL_CHARACTER = 'Password must contain at least 1 special character: !@#$%^&*',
  PASSWORD_REQUIRED = 'Password is required',
  WRONG_LOGIN = 'Wrong email or password',
}

enum serviceErrors {
  INVALID_CUSTOMER_CREDENTIALS = 400,
}

type PasswordType = 'password' | 'text';

export { errorsMessage, serviceErrors };
export type { PasswordType };
