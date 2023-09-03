import { MyCustomerUpdate, MyCustomerUpdateAction } from "@commercetools/platform-sdk";
import { UpdateCustomer } from "../../../api/apiFunctions";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditAddressFormData, EditAddressFormProps } from "../../../types/profilePageTypes";
import { FC, useEffect, useState } from "react";
import MyAddressInput from "../AddAddressForm/AddAddressInput/AddAddressInput";
import { validateFields } from "../RegistrationForm/validateFields";
import MyAddressSelectInput from "../AddAddressForm/AddAddressInput/AddAddressSelect";

const EditAddressForm: FC<EditAddressFormProps> = (props: EditAddressFormProps) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
      } = useForm<EditAddressFormData>({ mode: 'all'});

      const [isDefaultShipping, setDefaultShipping] = useState(props.isDefaultShipping)
      const [isDefaultBilling, setDefaultBilling] = useState(props.isDefaultBilling)

      useEffect(() => {
        setValue('city', props.address.city || '')
        setValue('streetName', props.address.streetName || '')
        setValue('state', props.address.state || '')
        setValue('postalCode', props.address.postalCode || '')
      },[props.activeModal])
      
      const actionsArray: MyCustomerUpdateAction[] = []
      const [array, setActionArray] = useState(actionsArray)

      const removeShippingAddressAction: MyCustomerUpdateAction = {
        action: 'removeShippingAddressId',
        addressId: props.addressID
      }
      const removeBillingAddressAction: MyCustomerUpdateAction = {
        action: 'removeBillingAddressId',
        addressId: props.addressID
      }
      const setDefaultShippingAction: MyCustomerUpdateAction = {
        action: 'setDefaultShippingAddress',
        addressId: props.addressID
      }
      const setDefaultBillingAction: MyCustomerUpdateAction = {
        action: 'setDefaultBillingAddress',
        addressId: props.addressID
      }

      const onSubmit: SubmitHandler<EditAddressFormData> = (data: EditAddressFormData ) => {
        
        const changeAddressAction: MyCustomerUpdateAction = {
            action: 'changeAddress',
            addressId: props.addressID,
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
               UpdateCustomer(UpdateCustomerData).then(() => {
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
      <button onClick={(e) => {
        e.preventDefault()
        props.setModalActive(false)
      }}>Back</button>
    </form>
        </div>
    )
}
export default EditAddressForm