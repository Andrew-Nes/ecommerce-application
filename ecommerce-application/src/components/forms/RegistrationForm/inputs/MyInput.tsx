import classes from './MyInput.module.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';
import { errorsMessage } from '../../../../types/formTypes';

export default function MyInput(props: MyInputProps) {
  let requiredErrorText: string;
  props.type === 'date'
    ? (requiredErrorText = errorsMessage.DATE_OF_BIRTH_REQUIRED)
    : (requiredErrorText = `${props.title} is required`);
  return (
    <div className={classes.myInput__container}>
      <label className={classes.myInput_label}>{props.title}:</label>
      <input
        className={`${classes.myInput_input} ${
          props.errors[props.name]?.message ? classes.input_error : ''
        }`}
        type={props.type}
        {...props.register(props.name, {
          required: requiredErrorText,
          validate: props.validate,
        })}
        title={props.name}
      />
      <p className={classes.myInput_errorText} title={`${props.name}Error`}>
        {props.errors[props.name]?.message}
      </p>
    </div>
  );
}
