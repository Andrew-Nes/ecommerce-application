import { Address, Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  Validate,
  UseFormClearErrors,
} from 'react-hook-form';

interface ProfilePageProp {
  loginStateChange: (newValue: boolean) => void;
}
interface ProfileCardAddressProps {
  currentCustomer: Customer | undefined;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  loginStateChange: (newValue: boolean) => void;
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

interface EditPassFormData {
  currentPass: string;
  newPass: string;
  confirmNewPass: string;
}

interface EditPassFormProps {
  isActive: boolean;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  version: number | undefined;
  customerID: string | undefined;
  customerPassword: string | undefined;
  email: string;
  loginStateChange: (newValue: boolean) => void;
}

interface EditPassInputProps {
  register: UseFormRegister<EditPassFormData>;
  errors: FieldErrors<EditPassFormData>;
  name: 'currentPass' | 'newPass' | 'confirmNewPass';
  title: string;
  validate?:
    | Validate<string, EditPassFormData>
    | Record<string, Validate<string, EditPassFormData>>
    | undefined;
  clearErrors: UseFormClearErrors<EditPassFormData>;
  type?: string;
  value?: string;
}

export type {
  ProfileCardAddressProps,
  AddressItemProps,
  EditProfileFormProps,
  EditProfileFormData,
  MyProfileInputProps,
  EditPassFormData,
  EditPassFormProps,
  EditPassInputProps,
  ProfilePageProp,
};
