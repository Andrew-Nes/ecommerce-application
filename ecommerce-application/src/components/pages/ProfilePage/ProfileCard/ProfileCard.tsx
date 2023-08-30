import { Dispatch, FC, SetStateAction, useState } from "react";
import '../ProfilePage.scss'
import MyModal from "../../../Modal/MyModal";
import EditProfileForm from "../../../forms/EditProfileForm/EditProfileForm";

interface ProfileCardProps {
    firstName: string
    lastName: string
    dateOfBirth: string
    email:string
    version: string
    isUpdateData: Dispatch<SetStateAction<boolean>>
}

const ProfileCard: FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <fieldset className="customer-data__container"> 
        <legend>Customer Data</legend>
        <div className="customer-data_item">
          <label className="customer-data-item_label">First Name:</label>
          <span className="customer-data-item_content">{props.firstName}</span>
        </div>
        <div className="customer-data_item">
          <label className="customer-data-item_label">Email:</label>
          <span className="customer-data-item_content">{props.email}</span>
        </div>
        <div className="customer-data_item">
          <label className="customer-data-item_label">Last Name:</label>
          <span className="customer-data-item_content">{props.lastName}</span>
        </div>
        <div className="customer-data_item">
          <label className="customer-data-item_label">Date Of Birth:</label>
          <span className="customer-data-item_content">{props.dateOfBirth}</span>
        </div>
        <button
          className="edit-profile_button"
          onClick={() => setModalActive(true)}
        >
          Edit profile
        </button>
        <MyModal active={modalActive} setActive={setModalActive}>
          <EditProfileForm 
          firstName={props.firstName}
          lastName={props.lastName}
          dateOfBirth={props.dateOfBirth}
          email={props.email}
          version={props.version} 
          active={modalActive} 
          isUpdateData={props.isUpdateData} 
          setModalActive={setModalActive}/>
        </MyModal>
      </fieldset>
    )
}

export default ProfileCard