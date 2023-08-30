import { FC } from "react";
import { MyAddressInputProps } from "./MyAddressInput";

const MyAddressSelectInput: FC<MyAddressInputProps> =(props: MyAddressInputProps) => {
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
    )
}

export default MyAddressSelectInput