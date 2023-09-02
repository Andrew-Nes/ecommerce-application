import { FC } from 'react';
import './EditProfileInput.scss';
import { MyProfileInputProps } from '../../../../types/profilePageTypes';

const MyProfileInput: FC<MyProfileInputProps> = (
  props: MyProfileInputProps
) => {
  return (
    <div className="profile-input__container">
      <label className="profile-input_label">{props.title}:</label>
      <input
        className={`profile-input-input ${
          props.errors[props.name] ? 'input__error' : ''
        }`}
        type={props.type}
        {...props.register(props.name, {
          required: 'required',
          validate: props.validate,
        })}
        title={props.name}
      />
      <span className="error__message" title={`${props.name}Error`}>
        {props.errors[props.name]?.message}
      </span>
    </div>
  );
};

export default MyProfileInput;
