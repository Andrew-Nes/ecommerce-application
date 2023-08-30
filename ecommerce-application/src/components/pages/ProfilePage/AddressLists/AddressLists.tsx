import { Address } from "@commercetools/platform-sdk"
import { Dispatch, FC, SetStateAction } from "react"
import AddressItem from "./AddressItem/AddressItem"
import './AddressList.scss'
interface AddressListsProps {
    addresses: Address[]
    shippingAddresses: string[]
    billingAddresses: string[]
    defaultShipping: string
    defaultBilling: string
    isUpdateData: Dispatch<SetStateAction<boolean>>
    version: string
}



const AddressLists: FC<AddressListsProps> = (props: AddressListsProps) => {


    return (
        <div>
            <ul className="address-list__container">
                {props.addresses.map((address, index)=> {
                    return (
                        <AddressItem
                        version={props.version}
                        isUpdateData={props.isUpdateData}
                        address={address}
                        isShipping={
                            props.shippingAddresses.includes(address.id || '') 
                            ? true
                            : false
                        }
                        isBilling={
                            props.billingAddresses.includes(address.id || '')
                            ? true
                            : false
                        }
                        isDefaultBilling={
                            props.defaultBilling === address.id 
                            ? true
                            : false
                        }
                        isDefaultShipping={
                            props.defaultShipping === address.id 
                            ? true
                            : false
                        }
                        key={`'key'${index}`}
                        
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default AddressLists