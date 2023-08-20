import { MyInputProps } from '../../../../../types/registrationFormTypes';
import '../../RegistrationForm.scss';

export default function MyCheckBox(props: MyInputProps) {
  return (
    <div className="checkbox__container">
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
