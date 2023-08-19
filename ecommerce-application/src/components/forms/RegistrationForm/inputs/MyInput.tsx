import './MyInput.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';

export default function MyInput(props: MyInputProps) {
  return (
    <div className="input-wrapper">
      <label className="label">{props.title}:</label>
      <input
        className={`input registration__input ${
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
}
