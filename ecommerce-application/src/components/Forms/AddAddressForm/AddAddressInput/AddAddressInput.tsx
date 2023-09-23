import { FC } from 'react';
import { MyAddressInputProps } from '../../../../types/profilePageTypes';

export const MyAddressInput: FC<MyAddressInputProps> = (
  props: MyAddressInputProps
) => {
  return (
    <div className="edit-profile-input-wrapper">
      <label className="edit-profile-label">{props.title}:</label>
      <input
        className={`input edit-profile__input ${
          props.errors[props.name] ? 'input__error' : ''
        }`}
        type={props.type}
        {...props.register(props.name, {
          required: `${props.title} is required`,
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

export default MyAddressInput;
