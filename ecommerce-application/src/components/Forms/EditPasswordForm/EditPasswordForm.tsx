import { SubmitHandler, useForm } from 'react-hook-form';
import EditPassInput from './EditPassInput/EditPassInput';
import { validateFields } from '../RegistrationForm/validateFields';
import { UpdateCustomerPassword, loginClient } from '../../../api/apiFunctions';
import { CustomerChangePassword } from '@commercetools/platform-sdk';
import {
  EditPassFormProps,
  EditPassFormData,
} from '../../../types/profilePageTypes';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { popupText } from '../../../types/elementsText';
import { routes } from '../../../types/routingTypes';
import { redirect } from 'react-router-dom';

const EditPassForm = (props: EditPassFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    clearErrors,
    setError,
  } = useForm<EditPassFormData>({ mode: 'all' });

  useEffect(() => {
    reset();
  }, [props.isActive, reset]);

  const onSubmit: SubmitHandler<EditPassFormData> = async (data) => {
    clearErrors();
    if (data.currentPass !== props.customerPassword) {
      setError('root.passErrors', {
        type: 'wrongPass',
        message: 'Wrong current password!',
      });
    }
    if (data.newPass !== data.confirmNewPass) {
      setError('root.passErrors', {
        type: 'wrongConfirmPass',
        message: 'New password not confirmed!',
      });
    }
    if (data.newPass === props.customerPassword) {
      setError('root.passErrors', {
        type: 'setSamePass',
        message: 'You must input new password!',
      });
    }
    const UpdateCustomerPassData: CustomerChangePassword = {
      id: props.customerID || '',
      version: Number(props.version),
      currentPassword: data.currentPass,
      newPassword: data.newPass,
    };
    try {
      await UpdateCustomerPassword(UpdateCustomerPassData);
      props.loginStateChange(false);
      window.localStorage.clear();

      await loginClient(props.email, data.newPass);
      props.loginStateChange(true);
      redirect(routes.PROFILE);
      reset();
      props.setModalActive(false);
      props.isUpdateData(true);
      toast.success(popupText.CHANGE_PASSWORD_SUCCESS, {
        position: 'bottom-center',
      });
    } catch (error) {
      toast.error(popupText.CHANGE_PASSWORD_FAILED, {
        position: 'bottom-center',
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>{errors.root?.passErrors.message}</span>
        <EditPassInput
          register={register}
          name="currentPass"
          title="Current password"
          validate={validateFields.PASSWORD_VALIDATE}
          errors={errors}
          clearErrors={clearErrors}
        />
        <EditPassInput
          register={register}
          name="newPass"
          title="New password"
          validate={validateFields.PASSWORD_VALIDATE}
          errors={errors}
          clearErrors={clearErrors}
        />
        <EditPassInput
          register={register}
          name="confirmNewPass"
          title="Confirm new password"
          validate={validateFields.PASSWORD_VALIDATE}
          errors={errors}
          clearErrors={clearErrors}
        />
        <div className="edit-pass__button-container">
          <button type="submit" disabled={!isValid}>
            Change Password
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          props.setModalActive(false);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default EditPassForm;
