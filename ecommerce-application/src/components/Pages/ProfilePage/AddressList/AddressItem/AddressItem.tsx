import { FC, useState } from 'react';
import './AddressItem.scss';
import MyModal from '../../../../Modal/MyModal';
import { AddressItemProps } from '../../../../../types/profilePageTypes';
import {
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../../../api/apiFunctions';
import EditAddressForm from '../../../../Forms/EditAddressForm/EditAddressForm';
import SetDefaultButton from './SetDefaultButton/SetDefaultButton';
import { toast } from 'react-toastify';
import { popupText } from '../../../../../types/elementsText';

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
    try {
      await UpdateCustomer(UpdateCustomerData);
      props.isUpdateData(true);
      toast.success(popupText.DELETE_ADDRESS_SUCCESS, {
        position: 'bottom-center',
      });
    } catch (error) {
      toast.error(popupText.DELETE_ADDRESS_FAILED, {
        position: 'bottom-center',
      });
    }
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
      {props.address.state ? (
        <div className="address-data_item">
          <label className="address-data-item_label">State:</label>
          <span className="address-data-item_content">
            {props.address.state}
          </span>
        </div>
      ) : (
        ''
      )}

      <div className="address-item__buttons-container address-detail">
        {props.isShipping && !props.isDefaultShipping ? (
          <SetDefaultButton
            text="Set as default shipping"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="setDefaultShippingAddress"
          />
        ) : (
          ''
        )}
        {props.isBilling && !props.isDefaultBilling ? (
          <SetDefaultButton
            text="Set as default billing"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="setDefaultBillingAddress"
          />
        ) : (
          ''
        )}
        {!props.isShipping ? (
          <SetDefaultButton
            text="Set as shipping"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="addShippingAddressId"
          />
        ) : (
          <SetDefaultButton
            text="Remove shipping"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="removeShippingAddressId"
          />
        )}
        {!props.isBilling ? (
          <SetDefaultButton
            text="Set as billing"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="addBillingAddressId"
          />
        ) : (
          <SetDefaultButton
            text="Remove billing"
            isUpdateData={props.isUpdateData}
            addressID={props.addressID}
            version={props.version?.toString() || ''}
            action="removeBillingAddressId"
          />
        )}
      </div>
      <div className="address-item__buttons-container">
        <button
          className="address-edit_button"
          onClick={() => setModalActive(true)}
        >
          Edit
        </button>
        <button
          className="address-edit_button"
          onClick={() => {
            deleteAddress();
          }}
        >
          Delete
        </button>
      </div>

      <MyModal active={isModalActive} setActive={setModalActive}>
        <EditAddressForm
          setModalActive={setModalActive}
          isUpdateData={props.isUpdateData}
          address={props.address}
          activeModal={isModalActive}
          addressID={props.addressID}
          version={props.version?.toString() || ''}
          isShipping={props.isShipping}
          isBilling={props.isBilling}
          isDefaultBilling={props.isDefaultBilling}
          isDefaultShipping={props.isDefaultShipping}
        />
      </MyModal>
    </li>
  );
};

export default AddressItem;
