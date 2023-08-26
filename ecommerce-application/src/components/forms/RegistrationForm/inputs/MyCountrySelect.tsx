import { FC } from 'react';
import { MyInputProps } from '../../../../types/registrationFormTypes';
import './myInput.scss';

const MyCountrySelect: FC<MyInputProps> = (props) => {
  return (
    <div className="input-wrapper">
      <label className="label">{props.title}:</label>
      <select
        disabled={props.stateSameAddress}
        className="input select"
        {...props.register(props.name)}
        title={props.name}
      >
        {props.countries?.map((country) => {
          return <option key={country}>{country}</option>;
        })}
      </select>
    </div>
  );
};

export default MyCountrySelect;
