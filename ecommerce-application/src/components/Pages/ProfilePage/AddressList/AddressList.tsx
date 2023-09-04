import { FC } from 'react';
import { ProfileCardAddressProps } from '../../../../types/profilePageTypes';
import AddressItem from './AddressItem/AddressItem';
import './AddressList.scss';

const AddressLists: FC<ProfileCardAddressProps> = (props) => {
  return (
    <fieldset className="address-list__wrapper">
      <legend>Addresses</legend>
      <ul className="address-list__container">
        {props.currentCustomer?.addresses.map((address, index) => {
          return (
            <AddressItem
              version={props.currentCustomer?.version}
              isUpdateData={props.isUpdateData}
              address={address}
              isShipping={
                props.currentCustomer?.shippingAddressIds?.includes(
                  address.id || ''
                )
                  ? true
                  : false
              }
              isBilling={
                props.currentCustomer?.billingAddressIds?.includes(
                  address.id || ''
                )
                  ? true
                  : false
              }
              isDefaultBilling={
                props.currentCustomer?.defaultBillingAddressId === address.id
                  ? true
                  : false
              }
              isDefaultShipping={
                props.currentCustomer?.defaultShippingAddressId === address.id
                  ? true
                  : false
              }
              key={`'key'${index}`}
              addressID={address.id || ''}
              defaultShippingID={
                props.currentCustomer?.defaultShippingAddressId
              }
              defaultBillingID={props.currentCustomer?.defaultBillingAddressId}
            />
          );
        })}
      </ul>
    </fieldset>
  );
};

export default AddressLists;
