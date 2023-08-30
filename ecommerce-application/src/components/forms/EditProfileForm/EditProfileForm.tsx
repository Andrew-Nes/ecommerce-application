import './EditProfileForm.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateFields } from '../RegistrationForm/validateFields';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import MyProfileInput from './Input/MyProfileInput';
import { CustomerUpdateAction, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { UpdateCustomer } from '../../../api/apiFunctions';

export interface EditProfileFormData {
  firstName: string,
  lastName:string,
  dateOfBirth: string
  email: string
}

export interface EditProfileFormProps {
  version: string
  firstName: string,
  lastName:string,
  dateOfBirth: string
  email:string
  active: boolean,
  isUpdateData: Dispatch<SetStateAction<boolean>>
  setModalActive: Dispatch<SetStateAction<boolean>>

}


const EditProfileForm: FC<EditProfileFormProps> = (props: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditProfileFormData>({ mode: 'all'});

 useEffect(() => {
    setValue('firstName', props.firstName)
    setValue('lastName', props.lastName)
    setValue('dateOfBirth', props.dateOfBirth)
    setValue('email', props.email)
  },[props.active]) 

  const onSubmit: SubmitHandler<EditProfileFormData> = (data: EditProfileFormData) => {

    const setFirstNameAction: CustomerUpdateAction = {
      action: "setFirstName",
      firstName: data.firstName
    }
    const setLastNameAction: CustomerUpdateAction = {
      action: "setLastName",
      lastName: data.lastName
    }
    const setDateOfBirthAction: CustomerUpdateAction = {
      action: "setDateOfBirth",
      dateOfBirth: data.dateOfBirth
    }

    const UpdateCustomerData: MyCustomerUpdate = {
      actions: [setFirstNameAction, setLastNameAction, setDateOfBirthAction],
      version: Number(props.version)
    }
    try{
     const token = window.localStorage.getItem('token') || ''
        UpdateCustomer(token, UpdateCustomerData).then(() => {
          props.isUpdateData(true)
          props.setModalActive(false)
        })
    }
    catch(error) {
      console.log(error)
    }
  } 
  return (
  <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyProfileInput
        register={register}
        name='firstName'
        title='First Name:'
        validate={validateFields.FIRST_NAME_VALIDATE}
        errors={errors}
       
      />
        <MyProfileInput
        register={register}
        name='email'
        title='Email:'
        validate={validateFields.EMAIL_VALIDATE}
        errors={errors}
       
      />
      <MyProfileInput
        register={register}
        name='lastName'
        title='Last Name:'
        validate={validateFields.LAST_NAME_VALIDATE}
        errors={errors}
       
      />
      <MyProfileInput
        register={register}
        name='dateOfBirth'
        title='Date of Birth:'
        validate={validateFields.DATE_OF_BIRTH_VALIDATE}
        errors={errors}
        type='date'
       
      />
      <button
      type='submit'
      disabled={!isValid}>Save</button>
    </form>
  </div>
  )
};

export default EditProfileForm;
