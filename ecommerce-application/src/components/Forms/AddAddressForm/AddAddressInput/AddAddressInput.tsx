import { FC } from 'react';
import { MyAddressInputProps } from '../../../../types/profilePageTypes';

export const MyAddressInput: FC<MyAddressInputProps> = (
  props: MyAddressInputProps
) => {
  return (
    <div>
      <label className="label">{props.title}:</label>
      <input
        className={`input registration__input ${
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

export default MyAddressInput;
