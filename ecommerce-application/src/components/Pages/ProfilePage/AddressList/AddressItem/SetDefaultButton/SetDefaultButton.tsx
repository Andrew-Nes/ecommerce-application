import { MyCustomerUpdate, MyCustomerUpdateAction } from "@commercetools/platform-sdk";
import { UpdateCustomer } from "../../../../../../api/apiFunctions";
import { Dispatch, SetStateAction } from "react";

interface SetDefaultShippingButtonProps {
    text: string
    isUpdateData: Dispatch<SetStateAction<boolean>>
    addressID: string
    version: string
    action: 'removeShippingAddressId' | 'removeBillingAddressId' | 'setDefaultShippingAddress' | 'setDefaultBillingAddress' | 'addShippingAddressId' | 'addBillingAddressId'
}

const SetDefaultButton = (props: SetDefaultShippingButtonProps) => {
    
    const setDefaultAddress = async () => {
        try{
            const setDefaultAddressAction: MyCustomerUpdateAction = {
                action: props.action,
                addressId: props.addressID
            }
            const UpdateCustomerData: MyCustomerUpdate = {
                actions: [setDefaultAddressAction],
                version: Number(props.version)
              }
                await UpdateCustomer(UpdateCustomerData)
                props.isUpdateData(true)
           }
           catch(error) {
             console.log(error)
           }
    } 
    return (
        <div>
            <button onClick={setDefaultAddress}>{props.text}</button>
        </div>
    )
}

export default SetDefaultButton