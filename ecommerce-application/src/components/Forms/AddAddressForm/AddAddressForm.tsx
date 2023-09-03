import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateFields } from '../RegistrationForm/validateFields';
import MyAddressInput from './AddAddressInput/AddAddressInput';
import {
  AddAddressFormProps,
  AddAddressFormData,
} from '../../../types/profilePageTypes';
import MyAddressSelectInput from './AddAddressInput/AddAddressSelect';
import {
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../api/apiFunctions';

export const AddAddressForm: FC<AddAddressFormProps> = (
  props: AddAddressFormProps
) => {
  const [isShipping, setShipping] = useState(false);
  const [isBilling, setBilling] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddAddressFormData>({ mode: 'all' });

  const onSubmit: SubmitHandler<AddAddressFormData> = async (
    data: AddAddressFormData
  ) => {
    const addressKey = new Date();
    const addAddressAction: MyCustomerUpdateAction = {
      action: 'addAddress',
      address: {
        country: data.country,
        city: data.city,
        streetName: data.streetName,
        postalCode: data.postalCode,
        state: data.state,
        key: addressKey.toString(),
      },
    };

    const UpdateCustomerData: MyCustomerUpdate = {
      actions: [addAddressAction],
      version: Number(props.version),
    };
    try {
      await UpdateCustomer(UpdateCustomerData);
      if (isShipping) {
        const addShippingAddressAction: MyCustomerUpdateAction = {
          action: 'addShippingAddressId',
          addressKey: addressKey.toString(),
        };
        const UpdateCustomerData: MyCustomerUpdate = {
          actions: [addShippingAddressAction],
          version: Number(props.version) + 1,
        };
        await UpdateCustomer(UpdateCustomerData);
      }
      if (isBilling) {
        const addBillingAddressAction: MyCustomerUpdateAction = {
          action: 'addBillingAddressId',
          addressKey: addressKey.toString(),
        };
        const UpdateCustomerData: MyCustomerUpdate = {
          actions: [addBillingAddressAction],
          version: Number(props.version) + (isShipping ? 2 : 1),
        };
        await UpdateCustomer(UpdateCustomerData);
      }
      reset();
      props.isUpdateData(true);
      props.setModalActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyAddressInput
          register={register}
          errors={errors}
          name="city"
          title="City:"
          validate={validateFields.CITY_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="streetName"
          title="Street:"
          validate={validateFields.STREET_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="postalCode"
          title="Postal Code:"
          validate={validateFields.POSTAL_CODE_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="state"
          title="State:"
          validate={validateFields.CITY_VALIDATE}
        />

        <MyAddressSelectInput
          register={register}
          errors={errors}
          name="country"
          title="Country:"
          countries={['US']}
        />

        <div>
          <label>Set as shipping</label>
          <input
            type="checkbox"
            onChange={(e) => {
              e.target.value === 'true'
                ? setShipping(true)
                : setShipping(false);
            }}
          />
        </div>

        <div>
          <label>Set as billing</label>
          <input
            type="checkbox"
            onChange={(e) => {
              e.target.value === 'true' ? setBilling(true) : setBilling(false);
            }}
          />
        </div>
        <button type="submit" disabled={!isValid}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
