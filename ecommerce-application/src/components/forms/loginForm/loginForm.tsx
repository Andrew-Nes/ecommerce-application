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
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    clearErrors();

    try {
      await loginClient(data.email, data.password);
      logIn();
      reset();
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
            validate: {
              domainExisting: (value) =>
                !value.endsWith('@') || errorsMessage.EMAIL_DOMAIN_EXIST,

              atSymbolExisting: (value) =>
                value.includes('@') || errorsMessage.EMAIL_AT_SYMBOL,

              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                errorsMessage.EMAIL_VALID,
            },
          })}
          className={`input login__input ${
            errors.email || errors.root?.serverError ? 'input__error' : ''
          }`}
          type="email"
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
              minLength: {
                value: 8,
                message: errorsMessage.PASSWORD_LENGTH,
              },
              validate: {
                uppercaseLetter: (value) =>
                  /[A-Z]/.test(value) ||
                  errorsMessage.PASSWORD_UPPERCASE_LETTER,

                lowercaseLetter: (value) =>
                  /[a-z]/.test(value) ||
                  errorsMessage.PASSWORD_LOWERCASE_LETTER,

                digitExisting: (value) =>
                  /[0-9]/.test(value) || errorsMessage.PASSWORD_DIGIT,

                specialCharacter: (value) =>
                  /[!@#$%^&*]/.test(value) ||
                  errorsMessage.PASSWORD_SPECIAL_CHARACTER,
              },
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
