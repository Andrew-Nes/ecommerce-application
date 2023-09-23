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
import { reloadPage } from '../../../../../../utils/apiHelpers';

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
      const errorCode = errorResponse.body.statusCode;
      if (errorCode === serviceErrors.INVALID_TOKEN) {
        reloadPage();
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
