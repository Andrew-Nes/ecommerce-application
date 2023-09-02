import { Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

interface ProfileCardProps {
  currentCustomer: Customer | undefined;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
}

export type { ProfileCardProps };
