import './loginForm.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import closeEyeIcon from '../../../../assets/img/close-eye.png';
import openEyeIcon from '../../../../assets/img/open-eye.png';
import {
  PasswordType,
  errorsMessage,
  serviceErrors,
} from '../../../types/formTypes';
import { loginClient } from '../../../api/apiFunctions';
import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import { buttonsText, headingText } from '../../../types/elementsText';
import { validateFields } from '../RegistrationForm/validateFields';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({ logIn }: { logIn(): void }) {
  const [passwordType, setPasswordType] = useState<PasswordType>('password');
  const [iconPath, setIconPath] = useState(closeEyeIcon);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setIconPath(openEyeIcon);
    } else {
      setPasswordType('password');
      setIconPath(closeEyeIcon);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    clearErrors();

    try {
      await loginClient(data.email, data.password);
      logIn();
      reset();
      toast.success('Registration completed successfully! You Log In.', {
        position: 'bottom-center',
      });
    } catch (error) {
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      if (
        errorResponse.body.statusCode ===
        serviceErrors.INVALID_CUSTOMER_CREDENTIALS
      ) {
        reset({ password: '' });
        setError('root.serverError', {
          type: `${errorResponse.body.statusCode}`,
          message: errorsMessage.WRONG_LOGIN,
        });
      }
    }
  };

  const onInput = () => {
    clearErrors('root.serverError');
  };

  return (
    <div className="login">
      <h3 className="heading login__heading">
        {headingText.LOGIN_PAGE_HEADING}
      </h3>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: errorsMessage.EMAIL_REQUIRED,
            validate: validateFields.EMAIL_VALIDATE,
          })}
          className={`input login__input ${
            errors.email || errors.root?.serverError ? 'input__error' : ''
          }`}
          type="text"
          placeholder="Email"
          onInput={onInput}
        />
        <span
          className={`error__message ${
            errors.email ? 'error__message_visible' : ''
          }`}
          data-testid="email-error"
        >
          {errors.email?.message}
        </span>
        <div className="password__wrapper">
          <input
            {...register('password', {
              required: errorsMessage.PASSWORD_REQUIRED,
              validate: validateFields.PASSWORD_VALIDATE,
            })}
            className={`input login__input input_password ${
              errors.password || errors.root?.serverError ? 'input__error' : ''
            }`}
            type={passwordType}
            placeholder="Password"
            onInput={onInput}
          />
          <img
            src={iconPath}
            className="icon_eye"
            onClick={togglePassword}
          ></img>
        </div>
        <span
          className={`error__message ${
            errors.password ? 'error__message_visible' : ''
          }`}
          data-testid="password-error"
        >
          {errors.password?.message}
        </span>
        <span
          className={`error__message ${
            errors.root?.serverError ? 'error__message_visible' : ''
          }`}
          data-testid="server-error"
        >
          {errors.root?.serverError.message}
        </span>
        <button
          className="button login__button"
          type="submit"
          disabled={!isValid}
        >
          {buttonsText.LOGIN}
        </button>
      </form>
    </div>
  );
}
