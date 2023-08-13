import { useState } from 'react';
import classes from './MyInput.module.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';
import { errorsMessage } from '../../../../types/formTypes';

export default function MyPassInput(props: MyInputProps) {
  const [isShown, setIsSHown] = useState(false);

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  return (
    <div className={classes.myInput__container}>
      <div className={classes.myPass_labelLine}>
        <label className={classes.myInput_label}>{props.title}:</label>
        <div className={classes.showPass__container}>
          <label>Show password?</label>
          <input type="checkbox" onChange={togglePassword} checked={isShown} />
        </div>
      </div>
      <input
        className={`${classes.myInput_input} ${
          props.errors[props.name]?.message ? classes.input_error : ''
        }`}
        type={isShown ? 'text' : 'password'}
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
      <p className={classes.myInput_errorText} title={`${props.name}Error`}>
        {props.errors[props.name]?.message}
      </p>
    </div>
  );
}
