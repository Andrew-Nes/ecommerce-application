import './MyInput.scss';
import { useState } from 'react';
import type { MyInputProps } from '../../../../types/registrationFormTypes';
import { PasswordType, errorsMessage } from '../../../../types/formTypes';
import closeEyeIcon from '../../../../../assets/img/close-eye.png';
import openEyeIcon from '../../../../../assets/img/open-eye.png';

export default function MyPassInput(props: MyInputProps) {
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

  return (
    <div className="input-wrapper">
      <label className="label">{props.title}:</label>
      <div className="password__wrapper">
        <input
          className={`input registration__input input_password ${
            props.errors[props.name] ? 'input__error' : ''
          }`}
          type={passwordType}
          {...props.register(props.name, {
            required: `${props.title} is required`,
            validate: props.validate,
            minLength: {
              value: 8,
              message: errorsMessage.PASSWORD_LENGTH,
            },
          })}
          title={props.name}
        />
        <img src={iconPath} className="icon_eye" onClick={togglePassword}></img>
      </div>
      <span className="error__message" title={`${props.name}Error`}>
        {props.errors[props.name]?.message}
      </span>
    </div>
  );
}
