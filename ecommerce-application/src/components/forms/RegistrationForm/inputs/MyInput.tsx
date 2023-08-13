import classes from './MyInput.module.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';

export default function MyInput(props: MyInputProps) {
  return (
    <div className={classes.myInput__container}>
      <label className={classes.myInput_label}>{props.title}:</label>
      <input
        className={`${classes.myInput_input} ${
          props.errors[props.name]?.message ? classes.input_error : ''
        }`}
        type={props.type}
        {...props.register(props.name, {
          required: `${props.title} is required`,
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
