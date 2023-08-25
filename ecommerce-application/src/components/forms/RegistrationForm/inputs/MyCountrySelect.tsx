import './myInput.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';
import { FC } from 'react';

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
