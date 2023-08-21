import type { FieldErrors, UseFormRegister, Validate } from 'react-hook-form';
import type { BaseAddress, MyCustomerDraft, CustomerDraft } from '@commercetools/platform-sdk';

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
  stateSameAddress?: boolean
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

  export default function convertDataForm (data: RegistrationFormData, setAddressState: boolean): CustomerDraft {
    const shippingAddress: BaseAddress = {
      country: data.countryShipping,
      city: data.cityShipping,
      streetName: data.streetShipping,
      postalCode: data.postalCodeShipping
    }

    const billingAddress: BaseAddress = {
      country: data.countryBilling,
      city: data.cityBilling,
      streetName: data.streetBilling,
      postalCode: data.postalCodeBilling
    }
    const customer: CustomerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      shippingAddresses: [0],
      billingAddresses: [setAddressState ? 0 : 1],
      addresses: setAddressState ? [shippingAddress] : [shippingAddress, billingAddress],
      defaultShippingAddress: data.defaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: data.defaultBillingAddress ? (setAddressState ? 0 : 1) : undefined
    }
    return customer
  }
  
export type { RegistrationFormData, InputRegistration, MyInputProps };
