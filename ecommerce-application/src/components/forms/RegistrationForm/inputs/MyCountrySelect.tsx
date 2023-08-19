import './MyInput.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';

export default function MyCountrySelect(props: MyInputProps) {
  return (
    <div className="input-wrapper">
      <label className="label">{props.title}:</label>
      <select
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
}
