import type { FieldErrors, UseFormRegister, Validate } from 'react-hook-form';
interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetShipping: string;
  cityShipping: string;
  postalCodeShipping: string;
  countryShipping: string;
  defaultShippingAddress: string;
  streetBilling: string;
  cityBilling: string;
  postalCodeBilling: string;
  countryBilling: string;
  defaultBillingAddress: string;
}

interface MyInputProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  name: InputRegistration;
  title: string;
  validate?:
    | Validate<string, RegistrationFormData>
    | Record<string, Validate<string, RegistrationFormData>>
    | undefined;
  type?: string;
  countries?: string[];
}
type InputRegistration =
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'streetShipping'
  | 'cityShipping'
  | 'postalCodeShipping'
  | 'countryShipping'
  | 'defaultShippingAddress'
  | 'streetBilling'
  | 'cityBilling'
  | 'postalCodeBilling'
  | 'countryBilling'
  | 'defaultBillingAddress';

export type { RegistrationFormData, InputRegistration, MyInputProps };
