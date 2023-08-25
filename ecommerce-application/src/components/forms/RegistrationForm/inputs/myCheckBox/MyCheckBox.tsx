import { FC } from 'react';
import { MyInputProps } from '../../../../../types/registrationFormTypes';
import '../../RegistrationForm.scss';

const MyCheckBox: FC<MyInputProps> = (props) => {
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
};

export default MyCheckBox;
