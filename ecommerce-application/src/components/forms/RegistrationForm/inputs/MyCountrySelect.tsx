import classes from './MyInput.module.scss';
import type { MyInputProps } from '../../../../types/registrationFormTypes';



export default function MyCountrySelect(props: MyInputProps) {
  return (
    <div className={classes.myInput__container}>
      <label>{props.title}</label>
      <select {...props.register(props.name)} title={props.name}>
        {props.countries?.map((country) => {
          return <option key={country}>{country}</option>;
        })}
      </select>
    </div>
  );
}
