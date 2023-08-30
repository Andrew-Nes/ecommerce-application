import { FC } from 'react'
import './MyProfileInput.scss'
import { FieldErrors, UseFormRegister, Validate } from 'react-hook-form';
import { EditProfileFormData } from '../EditProfileForm';
import { InputEditForm } from '../../../../types/registrationFormTypes';

interface MyProfileInputProps {
    register: UseFormRegister<EditProfileFormData>,
    errors: FieldErrors<EditProfileFormData>;
    name: InputEditForm;
    title: string;
    validate?:
    | Validate<string, EditProfileFormData>
    | Record<string, Validate<string, EditProfileFormData>>
    | undefined;
    type?: string;
    value?: string
}

const MyProfileInput: FC<MyProfileInputProps> = (props: MyProfileInputProps) => {
    return (
        <div className='profile-input__container'>
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

export default MyProfileInput