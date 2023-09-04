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
interface MyModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode | string;
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

interface MyAddressInputProps {
  register: UseFormRegister<AddAddressFormData>;
  errors: FieldErrors<AddAddressFormData>;
  name: 'country' | 'streetName' | 'postalCode' | 'city' | 'state';
  title: string;
  validate?:
    | Validate<string, AddAddressFormData>
    | Record<string, Validate<string, AddAddressFormData>>
    | undefined;
  type?: string;
  value?: string;
  countries?: string[];
}

interface AddAddressFormData {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  state: string;
}

interface AddAddressFormProps {
  isModalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  version: number | undefined;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
}
interface EditAddressFormData {
  city: string;
  country: string;
  state: string;
  streetName: string;
  postalCode: string;
}

interface EditAddressFormProps {
  address: Address;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  activeModal: boolean;
  version: string;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  addressID: string;
}

interface SetDefaultShippingButtonProps {
  text: string;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
  addressID: string;
  version: string;
  action:
    | 'removeShippingAddressId'
    | 'removeBillingAddressId'
    | 'setDefaultShippingAddress'
    | 'setDefaultBillingAddress'
    | 'addShippingAddressId'
    | 'addBillingAddressId';
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
  MyAddressInputProps,
  AddAddressFormData,
  AddAddressFormProps,
  EditAddressFormData,
  EditAddressFormProps,
  SetDefaultShippingButtonProps,
  MyModalProps,
};
