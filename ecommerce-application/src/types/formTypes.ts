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
  FIRST_NAME_REQUIRED = 'First Name is required',
  FIRST_NAME_SPECIAL_CHARACTER = 'First name must not contain special characters',
  FIRST_NAME_NUMBERS = 'First Name must not contain numbers',
  LAST_NAME_REQUIRED = 'Last Name is required',
  LAST_NAME_SPECIAL_CHARACTER = 'Last Name must not contain special characters',
  LAST_NAME_NUMBERS = 'Last Name must not contain numbers',
  DATE_OF_BIRTH_REQUIRED = 'Date of birth is required',
  DATE_OF_BIRTH_AGE = 'You must be 13 years of age or older',
  STREET_REQUIRED = 'Street is required',
  CITY_REQUIRED = 'City is required',
  CITY_SPECIAL_CHARACTER = 'City must not contain special characters',
  CITY_NUMBERS = 'City must not contain numbers',
  POSTAL_CODE_REQUIRED = 'Postal code is required',
  POSTAL_CODE_FORMAT = 'Must follow the format 12345 or 12345-1234!',
}

type PasswordType = 'password' | 'text';

export { errorsMessage };
export type { PasswordType };
