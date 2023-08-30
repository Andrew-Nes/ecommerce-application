import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { validateFields } from "../RegistrationForm/validateFields"
import MyAddressInput from "../EditProfileForm/Input/MyAddressInput/MyAddressInput"
import MyAddressSelectInput from "../EditProfileForm/Input/MyAddressInput/MyAddressSelectInput"
import { UpdateCustomer } from "../../../api/apiFunctions"
import { CustomerUpdateAction, MyCustomerUpdate } from "@commercetools/platform-sdk"


export interface EditAddressFormData {
    city: string
    country: string
    state: string
    streetName: string
    postalCode: string
}

interface EditAddressFormProps {
    setModalActive: Dispatch<SetStateAction<boolean>>
    city: string
    state: string
    country: string
    postalCode: string
    streetName: string
    isUpdateData: Dispatch<SetStateAction<boolean>>
    activeModal: boolean
    addressId: string
    version: string
}


const EditAddressForm: FC<EditAddressFormProps> = (props: EditAddressFormProps) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
      } = useForm<EditAddressFormData>({ mode: 'all'});

      useEffect(() => {
        setValue('city', props.city)
        setValue('streetName', props.streetName)
        setValue('state', props.state)
        setValue('postalCode', props.postalCode)
      },[props.activeModal])

      const onSubmit: SubmitHandler<EditAddressFormData> = (data: EditAddressFormData ) => {

        const changeAddressAction: CustomerUpdateAction = {
            action: 'changeAddress',
            addressId: props.addressId,
            address: {
                country: data.country,
                city: data.city,
                streetName: data.streetName,
                postalCode: data.postalCode,
                state: data.state
            }
        }   
        const UpdateCustomerData: MyCustomerUpdate = {
            actions: [changeAddressAction],
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
     
       <MyAddressInput
       register={register}
       errors={errors}
       name="city"
       title="City:"
       validate={validateFields.CITY_VALIDATE}/>

        <MyAddressInput
       register={register}
       errors={errors}
       name="streetName"
       title="Street:"
       validate={validateFields.STREET_VALIDATE}/>

        <MyAddressInput
       register={register}
       errors={errors}
       name="postalCode"
       title="Postal Code:"
       validate={validateFields.POSTAL_CODE_VALIDATE}/>

<MyAddressInput
       register={register}
       errors={errors}
       name="state"
       title="State:"
       validate={validateFields.CITY_VALIDATE}/>

      <MyAddressSelectInput
      register={register}
      errors={errors}
      name="country"
      title="Country:"
      countries={['US']}/>

      <button
      type='submit'
      disabled={!isValid}>Save</button>
    </form>
        </div>
    )
}
export default EditAddressForm
