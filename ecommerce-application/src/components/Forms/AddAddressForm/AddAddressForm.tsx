import { FC } from 'react';
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddAddressFormData>({ mode: 'all' });

  const onSubmit: SubmitHandler<AddAddressFormData> = (
    data: AddAddressFormData
  ) => {
    const changeAddressAction: MyCustomerUpdateAction = {
      action: 'addAddress',
      address: {
        country: data.country,
        city: data.city,
        streetName: data.streetName,
        postalCode: data.postalCode,
        state: data.state,
      },
    };

    const UpdateCustomerData: MyCustomerUpdate = {
      actions: [changeAddressAction],
      version: Number(props.version),
    };
    try {
      UpdateCustomer(UpdateCustomerData).then(() => {
        props.isUpdateData(true);
        props.setModalActive(false);
      });
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

        <button type="submit" disabled={!isValid}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
