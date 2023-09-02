import { FC, useState } from 'react';
import './AddressItem.scss';
import MyModal from '../../../../Modal/MyModal';
import { AddressItemProps } from '../../../../../types/profilePageTypes';
import {
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../../../api/apiFunctions';

const AddressItem: FC<AddressItemProps> = (props: AddressItemProps) => {
  const [isModalActive, setModalActive] = useState(false);

  const deleteAddress = async () => {
    const removeAddressAction: MyCustomerUpdateAction = {
      action: 'removeAddress',
      addressId: props.addressID,
    };

    const UpdateCustomerData: MyCustomerUpdate = {
      actions: [removeAddressAction],
      version: Number(props.version),
    };
    await UpdateCustomer(UpdateCustomerData);
    props.isUpdateData(true);
  };

  return (
    <li
      className={
        props.isDefaultShipping
          ? 'address__container default-shipping'
          : props.isDefaultBilling
          ? 'address__container default-billing'
          : 'address__container'
      }
    >
      <div className="address-type__container">
        {props.isShipping ? (
          <span className="address-type shipping">Shipping</span>
        ) : (
          ''
        )}
        {props.isDefaultShipping ? (
          <span className="address-type shipping">DefaultShipping</span>
        ) : (
          ''
        )}
        {props.isBilling ? (
          <span className="address-type billing">Billing</span>
        ) : (
          ''
        )}

        {props.isDefaultBilling ? (
          <span className="address-type billing">DefaultBilling</span>
        ) : (
          ''
        )}
      </div>

      <div className="address-data_item">
        <label className="address-data-item_label">City:</label>
        <span className="address-data-item_content">{props.address.city}</span>
      </div>

      <div className="address-data_item">
        <label className="address-data-item_label">Country:</label>
        <span className="address-data-item_content">
          {props.address.country}
        </span>
      </div>

      <div className="address-data_item">
        <label className="address-data-item_label">Street name:</label>
        <span className="address-data-item_content">
          {props.address.streetName}
        </span>
      </div>

      <div className="address-data_item">
        <label className="address-data-item_label">Postal code:</label>
        <span className="address-data-item_content">
          {props.address.postalCode}
        </span>
      </div>
      <div className="address-item__buttons-container">
        <button
          className="address-edit_button"
          onClick={() => setModalActive(true)}
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteAddress();
          }}
        >
          Delete
        </button>
      </div>

      <MyModal active={isModalActive} setActive={setModalActive}></MyModal>
    </li>
  );
};

export default AddressItem;
