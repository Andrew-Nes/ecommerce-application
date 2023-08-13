import { errorsMessage } from '../../../types/formTypes';
const AGE_LIMIT: number = 13;
function checkAge(date: string): boolean | string {
  const curDate: Date = new Date();
  const cusDate: Date = new Date(date);
  const [ctrlYear, curMonth, curDay]: number[] = [
    curDate.getFullYear() - AGE_LIMIT,
    curDate.getMonth(),
    curDate.getDate(),
  ];
  const [cusYear, cusMonth, cusDay]: number[] = [
    cusDate.getFullYear(),
    cusDate.getMonth(),
    cusDate.getDate(),
  ];
  if (cusYear > ctrlYear) {
    return false;
  } else if (cusYear === ctrlYear && cusMonth < curMonth) {
    return false;
  } else if (cusYear === ctrlYear && cusMonth === curMonth && cusDay < curDay) {
    return false;
  }
  return true;
}

export const validateFields = {
  EMAIL_VALIDATE: {
    domainExisting: (value: string) =>
      !value.endsWith('@') || errorsMessage.EMAIL_DOMAIN_EXIST,
    atSymbolExisting: (value: string) =>
      value.includes('@') || errorsMessage.EMAIL_AT_SYMBOL,

    matchPattern: (value: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
      errorsMessage.EMAIL_VALID,
  },

  PASSWORD_VALIDATE: {
    uppercaseLetter: (value: string) =>
      /[A-Z]/.test(value) || errorsMessage.PASSWORD_UPPERCASE_LETTER,

    lowercaseLetter: (value: string) =>
      /[a-z]/.test(value) || errorsMessage.PASSWORD_LOWERCASE_LETTER,

    digitExisting: (value: string) =>
      /[0-9]/.test(value) || errorsMessage.PASSWORD_DIGIT,

    specialCharacter: (value: string) =>
      /[!@#$%^&*]/.test(value) || errorsMessage.PASSWORD_SPECIAL_CHARACTER,
  },
  FIRST_NAME_VALIDATE: {
    specialCharacter: (value: string) =>
      !/[!@#$%^&*]/.test(value) || errorsMessage.FIRST_NAME_SPECIAL_CHARACTER,
    digitExisting: (value: string) =>
      !/[0-9]/.test(value) || errorsMessage.FIRST_NAME_NUMBERS,
  },
  LAST_NAME_VALIDATE: {
    specialCharacter: (value: string) =>
      !/[!@#$%^&*]/.test(value) || errorsMessage.LAST_NAME_SPECIAL_CHARACTER,
    digitExisting: (value: string) =>
      !/[0-9]/.test(value) || errorsMessage.LAST_NAME_NUMBERS,
  },
  DATE_OF_BIRTH_VALIDATE: {
    testYearsOld: (value: string) =>
      checkAge(value) || errorsMessage.DATE_OF_BIRTH_AGE,
  },
  CITY_VALIDATE: {
    specialCharacter: (value: string) =>
      !/[!@#$%^&*]/.test(value) || errorsMessage.CITY_SPECIAL_CHARACTER,
    digitExisting: (value: string) =>
      !/[0-9]/.test(value) || errorsMessage.CITY_NUMBERS,
  },
  POSTAL_CODE_VALIDATE: {
    postalCOdeFormat: (value: string) =>
      /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) ||
      errorsMessage.POSTAL_CODE_FORMAT,
  },
};
