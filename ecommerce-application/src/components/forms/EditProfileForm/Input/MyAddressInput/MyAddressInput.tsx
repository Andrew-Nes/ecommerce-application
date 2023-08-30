import { FC } from "react"
import { UseFormRegister, FieldErrors, Validate } from "react-hook-form";
import { InputEditAddressForm } from "../../../../../types/registrationFormTypes";
import { EditAddressFormData } from "../../../EditAddressForm/EditAddressForm";


export interface MyAddressInputProps {
    register: UseFormRegister<EditAddressFormData>,
    errors: FieldErrors<EditAddressFormData>;
    name: InputEditAddressForm;
    title: string;
    validate?:
    | Validate<string, EditAddressFormData>
    | Record<string, Validate<string, EditAddressFormData>>
    | undefined;
    type?: string;
    value?: string
    countries?: string[]
}



const MyAddressInput: FC<MyAddressInputProps> = (props: MyAddressInputProps) => {
    return (
        <div>
            <label className="label">{props.title}:</label>
        <input
          className={`input registration__input ${
            props.errors[props.name] ? 'input__error' : ''}`}
          type={props.type}
          {...props.register(props.name, {
            required: 'required',
            validate: props.validate,
          })}
          title={props.name} 
        />
        <span className="error__message" title={`${props.name}Error`}>
          {props.errors[props.name]?.message}
        </span>
        </div>
    )
}

export default MyAddressInput