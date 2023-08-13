import { MyInputProps } from '../../../../../types/registrationFormTypes';
import classes from './MyCheckBox.module.scss';

export default function MyCheckBox(props: MyInputProps) {
  return (
    <div className={classes.checkbox__container}>
      <label>{props.title}</label>
      <input
        type="checkbox"
        {...props.register(props.name)}
        defaultChecked
        title={props.name}
      />
    </div>
  );
}
