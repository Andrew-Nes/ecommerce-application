import {
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../../../../api/apiFunctions';
import { FC } from 'react';
import { SetDefaultShippingButtonProps } from '../../../../../../types/profilePageTypes';



const SetDefaultButton :FC<SetDefaultShippingButtonProps> = (props: SetDefaultShippingButtonProps) => {
  const setDefaultAddress = async () => {
    try {
      const setDefaultAddressAction: MyCustomerUpdateAction = {
        action: props.action,
        addressId: props.addressID,
      };
      const UpdateCustomerData: MyCustomerUpdate = {
        actions: [setDefaultAddressAction],
        version: Number(props.version),
      };
      await UpdateCustomer(UpdateCustomerData);
      props.isUpdateData(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={setDefaultAddress}>{props.text}</button>
    </div>
  );
};

export default SetDefaultButton;
