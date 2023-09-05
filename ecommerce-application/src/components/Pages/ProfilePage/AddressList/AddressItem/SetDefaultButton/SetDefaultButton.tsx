import {
  ClientResponse,
  ErrorResponse,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../../../../api/apiFunctions';
import { FC } from 'react';
import { SetDefaultShippingButtonProps } from '../../../../../../types/profilePageTypes';
import { serviceErrors } from '../../../../../../types/formTypes';

const SetDefaultButton: FC<SetDefaultShippingButtonProps> = (
  props: SetDefaultShippingButtonProps
) => {
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
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;
      if (errorResponse.body.statusCode === serviceErrors.INVALID_TOKEN) {
        window.localStorage.clear();
        location.reload();
        // TODO
        // redirect to component
      }
    }
  };
  return (
    <div>
      <button onClick={setDefaultAddress}>{props.text}</button>
    </div>
  );
};

export default SetDefaultButton;
