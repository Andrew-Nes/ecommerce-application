import { FC, useState } from 'react';
import '../ProfilePage.scss';
import MyModal from '../../../../components/Modal/MyModal';
import { ProfileCardProps } from '../../../../types/profilePageTypes';

const ProfileCard: FC<ProfileCardProps> = (props: ProfileCardProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalPassActive, setPassModalActive] = useState(false);

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
        <label className="customer-data-item_label">Email:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.email}
        </span>
      </div>
      <div className="customer-data_item">
        <label className="customer-data-item_label">Last Name:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.lastName}
        </span>
      </div>
      <div className="customer-data_item">
        <label className="customer-data-item_label">Date Of Birth:</label>
        <span className="customer-data-item_content">
          {props.currentCustomer?.dateOfBirth}
        </span>
      </div>
      <button
        className="edit-profile_button"
        onClick={() => setModalActive(true)}
      >
        Edit profile
      </button>
      <MyModal active={modalActive} setActive={setModalActive}></MyModal>
      <button onClick={() => setPassModalActive(true)}>Change Password</button>

      <MyModal
        active={modalPassActive}
        setActive={setPassModalActive}
      ></MyModal>
    </fieldset>
  );
};

export default ProfileCard;
