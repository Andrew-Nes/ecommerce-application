import { Address, Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

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
interface MyModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode | string;
}

export type { ProfileCardAddressProps, AddressItemProps, MyModalProps };
