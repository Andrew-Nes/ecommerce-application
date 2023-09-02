import { FC } from 'react';
import { errorsMessage } from '../../../../types/formTypes';
import { MyInputProps } from '../../../../types/registrationFormTypes';
import './MyInput.scss';

const MyInput: FC<MyInputProps> = (props) => {
  let requiredErrorText: string;
  props.type === 'date'
    ? (requiredErrorText = errorsMessage.DATE_OF_BIRTH_REQUIRED)
    : (requiredErrorText = `${props.title} is required`);
  return (
    <div
      className={`${props.stateSameAddress ? 'close-field' : ''} input-wrapper`}
    >
      <label className="label">{props.title}:</label>
      <input
        className={`input registration__input ${
          props.errors[props.name] ? 'input__error' : ''
        } ${props.stateSameAddress ? 'value-input' : ''}`}
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

export default MyInput;
