import {
  ClientResponse,
  ErrorResponse,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../api/apiFunctions';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EditAddressFormData,
  EditAddressFormProps,
} from '../../../types/profilePageTypes';
import { FC, useEffect, useState } from 'react';
import MyAddressInput from '../AddAddressForm/AddAddressInput/AddAddressInput';
import { validateFields } from '../RegistrationForm/validateFields';
import MyAddressSelectInput from '../AddAddressForm/AddAddressInput/AddAddressSelect';
import { errorsMessage, serviceErrors } from '../../../types/formTypes';
import { toast } from 'react-toastify';
import { popupText } from '../../../types/elementsText';
import './EditAddressForm.scss';
const EditAddressForm: FC<EditAddressFormProps> = (
  props: EditAddressFormProps
) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditAddressFormData>({ mode: 'all' });

  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    setValue('city', props.address.city || '');
    setValue('streetName', props.address.streetName || '');
    setValue('state', props.address.state || '');
    setValue('postalCode', props.address.postalCode || '');
  }, [
    props.activeModal,
    props.address.city,
    props.address.streetName,
    props.address.state,
    props.address.postalCode,
    setValue,
  ]);

  const onSubmit: SubmitHandler<EditAddressFormData> = async (
    data: EditAddressFormData
  ) => {
    const changeAddressAction: MyCustomerUpdateAction = {
      action: 'changeAddress',
      addressId: props.addressID,
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
      setLoad(true);
      await UpdateCustomer(UpdateCustomerData);
      props.isUpdateData(true);
      props.setModalActive(false);
      toast.success(popupText.EDIT_ADDRESS_SUCCESS, {
        position: 'bottom-center',
      });
    } catch (error) {
      toast.error(popupText.EDIT_ADDRESS_FAILED, {
        position: 'bottom-center',
      });
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      const errorCode = errorResponse.body.statusCode;

      if (
        errorCode === serviceErrors.SERVICE_UNAVAILABLE ||
        errorCode === serviceErrors.BAD_GATEWAY ||
        errorCode === serviceErrors.INTERNAL_SERVER_ERROR
      ) {
        toast.info(errorsMessage.TOAST_SERVER_ERROR, {
          position: 'bottom-center',
        });
      }
      if (errorResponse.body.statusCode === serviceErrors.INVALID_TOKEN) {
        window.localStorage.clear();
        location.reload();
        // TODO
        // redirect to component
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyAddressInput
          register={register}
          errors={errors}
          name="city"
          title="City"
          validate={validateFields.CITY_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="streetName"
          title="Street"
          validate={validateFields.STREET_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="postalCode"
          title="Postal Code"
          validate={validateFields.POSTAL_CODE_VALIDATE}
        />

        <MyAddressInput
          register={register}
          errors={errors}
          name="state"
          title="State"
          validate={validateFields.STATE_VALIDATE}
        />

        <MyAddressSelectInput
          register={register}
          errors={errors}
          name="country"
          title="Country"
          countries={['US']}
        />
        <div className="edit-address-form__btn-container">
          <button
            className="edit-address-form_button"
            type="submit"
            disabled={!isValid || isLoad}
          >
            Save
          </button>
          <button
            className="edit-address-form_button"
            onClick={(e) => {
              e.preventDefault();
              props.setModalActive(false);
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditAddressForm;
