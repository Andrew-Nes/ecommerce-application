import './MyInput.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';
import { errorsMessage } from '../../../../types/formTypes';

export default function MyInput(props: MyInputProps) {
  let requiredErrorText: string;
  props.type === 'date'
    ? (requiredErrorText = errorsMessage.DATE_OF_BIRTH_REQUIRED)
    : (requiredErrorText = `${props.title} is required`);
  return (
    <div className="input-wrapper">
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
        disabled={props.stateSameAddress}
      />
      <span className="error__message" title={`${props.name}Error`}>
        {props.errors[props.name]?.message}
      </span>
    </div>
  );
}
