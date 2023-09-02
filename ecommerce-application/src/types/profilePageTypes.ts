import { Address, Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, FieldErrors, Validate } from 'react-hook-form';

interface ProfileCardAddressProps {
  currentCustomer: Customer | undefined;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
}

interface AddressItemProps {
  address: Address;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  key: string;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  version: number | undefined;
  addressID: string;
  defaultShippingID: string | undefined;
  defaultBillingID: string | undefined;
}

interface EditProfileFormProps {
  currentCustomer: Customer | undefined;
  isActive: boolean;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  setModalActive: Dispatch<SetStateAction<boolean>>;
}

interface EditProfileFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}
type InputEditForm = 'firstName' | 'lastName' | 'email' | 'dateOfBirth';
interface MyProfileInputProps {
  register: UseFormRegister<EditProfileFormData>;
  errors: FieldErrors<EditProfileFormData>;
  name: InputEditForm;
  title: string;
  validate?:
    | Validate<string, EditProfileFormData>
    | Record<string, Validate<string, EditProfileFormData>>
    | undefined;
  type?: string;
  value?: string;
}

export type {
  ProfileCardAddressProps,
  AddressItemProps,
  EditProfileFormProps,
  EditProfileFormData,
  MyProfileInputProps,
};
