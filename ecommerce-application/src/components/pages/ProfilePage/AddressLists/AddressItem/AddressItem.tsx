import { Address } from "@commercetools/platform-sdk"
import { Dispatch, FC, SetStateAction, useState } from "react"
import '../AddressList.scss'
import MyModal from "../../../../Modal/MyModal"
import EditAddressForm from "../../../../forms/EditAddressForm/EditAddressForm"


interface AddressItemProps {
  address: Address
  isShipping: boolean
  isBilling: boolean
  isDefaultShipping: boolean
  isDefaultBilling: boolean
  key: string
  isUpdateData: Dispatch<SetStateAction<boolean>>
  version: string
}
const AddressItem : FC<AddressItemProps> =(props: AddressItemProps) => {

  const [isModalActive, setModalActive] = useState(false)
    return (
        <li className="address__container">
            <span>{props.address.city}</span>
            <span>{props.address.state}</span>
            <span>{props.address.country}</span>
            <span>{props.address.streetName}</span>
            <span>{props.address.postalCode}</span>

            {props.isShipping ? <span>Shipping</span> : ''}
            {props.isBilling ? <span>Billing</span> : ''}
            {props.isDefaultShipping ? <span>DefaultShipping</span>  : ''}
            {props.isDefaultBilling ? <span>DefaultBilling</span> : ''}


        <button onClick={() => setModalActive(true)}>Edit</button>
        <MyModal active={isModalActive} setActive={setModalActive}>

          <EditAddressForm
          version={props.version}
          activeModal={isModalActive}
            isUpdateData={props.isUpdateData} 
            setModalActive={setModalActive}
            city={props.address.city || ''}
            postalCode={props.address.postalCode || ''}
            country={props.address.country}
            state={props.address.state || ''}
            streetName={props.address.streetName || ''}
            addressId={props.address.id || ''}
          />
        </MyModal>
        </li>
    )
}

export default AddressItem