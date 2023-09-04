import './EditProfileForm.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateFields } from '../RegistrationForm/validateFields';
import { FC, useEffect, useState } from 'react';
import MyProfileInput from './EditProfileInput/EditProfileInput';
import {
  ClientResponse,
  CustomerUpdateAction,
  ErrorResponse,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../api/apiFunctions';
import {
  EditProfileFormData,
  EditProfileFormProps,
} from '../../../types/profilePageTypes';
import { toast } from 'react-toastify';
import { serviceErrors, errorsMessage } from '../../../types/formTypes';
import { popupText } from '../../../types/elementsText';

const EditProfileForm: FC<EditProfileFormProps> = (
  props: EditProfileFormProps
) => {
  const [isLoad, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<EditProfileFormData>({ mode: 'all' });

  useEffect(() => {
    setValue('firstName', props.currentCustomer?.firstName || '');
    setValue('lastName', props.currentCustomer?.lastName || '');
    setValue('dateOfBirth', props.currentCustomer?.dateOfBirth || '');
    setValue('email', props.currentCustomer?.email || '');
  }, [
    props.isActive,
    setValue,
    props.currentCustomer?.firstName,
    props.currentCustomer?.lastName,
    props.currentCustomer?.dateOfBirth,
    props.currentCustomer?.email,
  ]);

  const onSubmit: SubmitHandler<EditProfileFormData> = async (
    data: EditProfileFormData
  ) => {
    const setFirstNameAction: CustomerUpdateAction = {
      action: 'setFirstName',
      firstName: data.firstName,
    };
    const setLastNameAction: CustomerUpdateAction = {
      action: 'setLastName',
      lastName: data.lastName,
    };
    const setDateOfBirthAction: CustomerUpdateAction = {
      action: 'setDateOfBirth',
      dateOfBirth: data.dateOfBirth,
    };

    const setEmailAction: CustomerUpdateAction = {
      action: 'changeEmail',
      email: data.email,
    };

    const UpdateCustomerData: MyCustomerUpdate = {
      actions: [
        setFirstNameAction,
        setLastNameAction,
        setDateOfBirthAction,
        setEmailAction,
      ],
      version: Number(props.currentCustomer?.version),
    };
    try {
      setLoad(true);
      await UpdateCustomer(UpdateCustomerData);
      props.isUpdateData(true);
      props.setModalActive(false);
      toast.success(popupText.EDIT_PROFILE_SUCCESS, {
        position: 'bottom-center',
      });
    } catch (error) {
      toast.error(popupText.EDIT_PROFILE_FAILED, {
        position: 'bottom-center',
      });
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      const errorCode = errorResponse.body.statusCode;
      const errorMessage = errorResponse.body.message;

      if (errorMessage === serviceErrors.DUPLICATE_FIELD) {
        setError('email', {
          type: 'existEmail',
          message: errorsMessage.EXIST_EMAIL,
        });
      } else if (
        errorCode === serviceErrors.INVALID_CUSTOMER_CREDENTIALS &&
        errorMessage !== serviceErrors.DUPLICATE_FIELD
      ) {
        toast.error(popupText.REGISTRATION_FAIL, {
          position: 'bottom-center',
        });
      }
      if (
        errorCode === serviceErrors.SERVICE_UNAVAILABLE ||
        errorCode === serviceErrors.BAD_GATEWAY ||
        errorCode === serviceErrors.INTERNAL_SERVER_ERROR
      ) {
        toast.info(errorsMessage.TOAST_SERVER_ERROR, {
          position: 'bottom-center',
        });
      }
    } finally {
      setLoad(false);
    }
  };
  return (
    <div>
      <form className="edit-profile__form" onSubmit={handleSubmit(onSubmit)}>
        <MyProfileInput
          register={register}
          name="firstName"
          title="First Name:"
          validate={validateFields.FIRST_NAME_VALIDATE}
          errors={errors}
        />
        <MyProfileInput
          register={register}
          name="email"
          title="Email:"
          validate={validateFields.EMAIL_VALIDATE}
          errors={errors}
        />
        <MyProfileInput
          register={register}
          name="lastName"
          title="Last Name:"
          validate={validateFields.LAST_NAME_VALIDATE}
          errors={errors}
        />
        <MyProfileInput
          register={register}
          name="dateOfBirth"
          title="Date of Birth:"
          validate={validateFields.DATE_OF_BIRTH_VALIDATE}
          errors={errors}
          type="date"
        />
        <div className="profile-edit-form__btn-container">
          <button
            className="profile-edit-form_button"
            type="submit"
            disabled={!isValid || isLoad}
          >
            Save
          </button>
          <button
            className="profile-edit-form_button"
            onClick={(e) => {
              e.preventDefault()
              props.setModalActive(false)
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
