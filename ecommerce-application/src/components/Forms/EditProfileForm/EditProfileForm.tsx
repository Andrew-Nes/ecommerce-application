import './EditProfileForm.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateFields } from '../RegistrationForm/validateFields';
import { FC, useEffect } from 'react';
import MyProfileInput from './EditProfileInput/EditProfileInput';
import {
  CustomerUpdateAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../api/apiFunctions';
import {
  EditProfileFormData,
  EditProfileFormProps,
} from '../../../types/profilePageTypes';

const EditProfileForm: FC<EditProfileFormProps> = (
  props: EditProfileFormProps
) => {
  const {
    register,
    handleSubmit,
    setValue,
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

  const onSubmit: SubmitHandler<EditProfileFormData> = (
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
        <button type="submit" disabled={!isValid}>
          Save
        </button>
        <button onClick={() => props.setModalActive(false)}>Back</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
