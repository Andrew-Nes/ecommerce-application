import './LoginForm.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import closeEyeIcon from '../../../../assets/img/close-eye.png';
import openEyeIcon from '../../../../assets/img/open-eye.png';
import { errorsMessage } from '../../../types/errorTypes';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [passwordType, setPasswordType] = useState('password');
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
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    reset();
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
          className={`login__input ${errors.email ? 'input__error' : ''}`}
          type="email"
          placeholder="Email"
        />
        <span
          className={`error__message ${
            errors.email ? 'error__message_visible' : ''
          }`}
        >
          {errors.email?.message}
        </span>
        <div className="password_wrapper">
          <input
            {...register('password', {
              required: 'This field is required',
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
            className={`login__input ${errors.password ? 'input__error' : ''}`}
            type={passwordType}
            placeholder="Password"
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
        >
          {errors.password?.message}
        </span>
        <button className="login__button" type="submit" disabled={!isValid}>
          login
        </button>
        <p>
          Not a registered?
          <span>
            {' '}
            <a className="login__anchor">Create your account</a>
          </span>
        </p>
      </form>
    </div>
  );
}
