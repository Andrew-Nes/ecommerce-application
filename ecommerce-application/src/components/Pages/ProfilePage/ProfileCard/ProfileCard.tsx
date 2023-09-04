import { FC, useState } from 'react';
import './ProfileCard.scss';
import MyModal from '../../../../components/Modal/MyModal';
import { ProfileCardAddressProps } from '../../../../types/profilePageTypes';
import EditProfileForm from '../../../Forms/EditProfileForm/EditProfileForm';
import EditPassForm from '../../../Forms/EditPasswordForm/EditPasswordForm';

const ProfileCard: FC<ProfileCardAddressProps> = (props) => {
  const [modalPassActive, setPassModalActive] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);
  return (
    <fieldset className="customer-data__container">
      <legend>Customer Data</legend>
      <div className="customer-data_item">
        <label className="customer-data-item_label">First Name:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.firstName}
        </span>
      </div>
      <div className="customer-data_item">
        <label className="customer-data-item_label">Last Name:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.lastName}
        </span>
      </div>
      <div className="customer-data_item">
        <label className="customer-data-item_label">Email:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.email}
        </span>
      </div>
      <div className="customer-data_item">
        <label className="customer-data-item_label">Date Of Birth:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.dateOfBirth}
        </span>
      </div>

      <div className="profile-card__buttons-container">
        <button
          className="edit-profile_button"
          onClick={() => setModalEditActive(true)}
        >
          Edit Profile
        </button>
        <button
          className="edit-profile_button"
          onClick={() => setPassModalActive(true)}
        >
          Change Password
        </button>
      </div>

      <MyModal active={modalEditActive} setActive={setModalEditActive}>
        <EditProfileForm
          isActive={modalEditActive}
          isUpdateData={props.isUpdateData}
          setModalActive={setModalEditActive}
          currentCustomer={props.currentCustomer}
        />
      </MyModal>

      <MyModal active={modalPassActive} setActive={setPassModalActive}>
        <EditPassForm
          isActive={modalPassActive}
          isUpdateData={props.isUpdateData}
          setModalActive={setPassModalActive}
          version={props.currentCustomer?.version}
          customerID={props.currentCustomer?.id}
          customerPassword={props.currentCustomer?.password}
          email={props.currentCustomer?.email || ''}
          loginStateChange={props.loginStateChange}
        />
      </MyModal>
    </fieldset>
  );
};

export default ProfileCard;
