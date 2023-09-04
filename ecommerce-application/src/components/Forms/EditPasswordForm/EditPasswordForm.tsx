import { SubmitHandler, useForm } from 'react-hook-form';
import EditPassInput from './EditPassInput/EditPassInput';
import { validateFields } from '../RegistrationForm/validateFields';
import { UpdateCustomerPassword, loginClient } from '../../../api/apiFunctions';
import {
  ClientResponse,
  CustomerChangePassword,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import {
  EditPassFormProps,
  EditPassFormData,
} from '../../../types/profilePageTypes';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { popupText } from '../../../types/elementsText';
import { routes } from '../../../types/routingTypes';
import { redirect } from 'react-router-dom';
import { errorsMessage, serviceErrors } from '../../../types/formTypes';

const EditPassForm: FC<EditPassFormProps> = (props: EditPassFormProps) => {
  const [isLoad, setLoad] = useState(false);
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
    if (data.newPass !== data.confirmNewPass) {
      setError('root.passErrors', {
        type: 'wrongConfirmPass',
        message: 'New password not confirmed!',
      });
      return;
    }

    const UpdateCustomerPassData: CustomerChangePassword = {
      id: props.customerID || '',
      version: Number(props.version),
      currentPassword: data.currentPass,
      newPassword: data.newPass,
    };
    try {
      setLoad(true);
      clearErrors();
      await UpdateCustomerPassword(UpdateCustomerPassData);
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
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      const errorCode = errorResponse.body.statusCode;
      const errorMessage = errorResponse.body.message;

      if (errorMessage === errorsMessage.CHANGE_PASSWORD_NOT_MATCH) {
        setError('root.passErrors', {
          type: 'wrongPass',
          message: 'Wrong current password!',
        });
      }
      if (
        errorCode === serviceErrors.SERVICE_UNAVAILABLE ||
        errorCode === serviceErrors.BAD_GATEWAY ||
        errorCode === serviceErrors.INTERNAL_SERVER_ERROR
      ) {
        toast.error(popupText.CHANGE_PASSWORD_FAILED, {
          position: 'bottom-center',
        });
      }
    } finally {
      setLoad(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="error__message">
          {errors.root?.passErrors.message}
        </span>
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
          <button type="submit" disabled={!isValid || isLoad}>
            Change Password
          </button>
          <button
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

export default EditPassForm;
