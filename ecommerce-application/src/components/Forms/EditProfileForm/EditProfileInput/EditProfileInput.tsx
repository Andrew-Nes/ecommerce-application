import { FC } from 'react';
import './EditProfileInput.scss';
import { MyProfileInputProps } from '../../../../types/profilePageTypes';
import { errorsMessage } from '../../../../types/formTypes';

const MyProfileInput: FC<MyProfileInputProps> = (
  props: MyProfileInputProps
) => {
  let requiredErrorText: string;
  props.type === 'date'
    ? (requiredErrorText = errorsMessage.DATE_OF_BIRTH_REQUIRED)
    : (requiredErrorText = `${props.title} is required`);
  return (
    <div className="edit-profile-input-wrapper">
      <label className="edit-profile-label">{props.title}:</label>
      <input
        className={`input edit-profile__input ${
          props.errors[props.name] ? 'input__error' : ''
        }`}
        type={props.type}
        {...props.register(props.name, {
          required: requiredErrorText,
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
