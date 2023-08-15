import './loginForm.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import closeEyeIcon from '../../../../assets/img/close-eye.png';
import openEyeIcon from '../../../../assets/img/open-eye.png';
import { PasswordType, errorsMessage } from '../../../types/formTypes';
import { loginClient } from '../../../api/apiFunctions';
import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
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
      reset();
    } catch (error) {
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;
      console.log('err3', errorResponse, errorResponse.body.statusCode);

      if (errorResponse.body.statusCode === 400) {
        reset({ password: '' });
        setError('root.serverError', {
          type: `${errorResponse.body.statusCode}`,
          message: 'Wrong email or password',
        });
      }
    }
  };

  const onInput = () => {
    clearErrors('root.serverError');
  };

  return (
    <div className="login">
      <h3 className="login_heading">Account Login</h3>
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
          className={`login__input ${
            errors.email || errors.root?.serverError ? 'input__error' : ''
          }`}
          type="email"
          placeholder="Email"
          onInput={onInput}
        />
        <span
          className={`error__message ${
            errors.email || errors.root?.serverError
              ? 'error__message_visible'
              : ''
          }`}
          data-testid="email-error"
        >
          {errors.email?.message || errors.root?.serverError.message}
        </span>
        <div className="password_wrapper">
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
            className={`login__input ${
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
        <button className="login__button" type="submit" disabled={!isValid}>
          login
        </button>
        <p>
          {`Not a registered? `}
          <span>
            <a className="login__anchor">Create your account</a>
          </span>
        </p>
      </form>
    </div>
  );
}
