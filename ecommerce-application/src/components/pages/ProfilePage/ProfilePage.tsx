import './profile-page.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../app';
import { FC } from 'react';
import MyModal from '../../Modal/MyModal';

const ProfilePage: FC = () => {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  const acessToken = window.localStorage.getItem('token') || ''

  const [modalActive, setModalActive] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')





  useEffect(() => {if (!isLoggedIn) redirect(routes.LOGIN);}, [isLoggedIn, path, redirect]);

  return (
    <div className='profile-page__wrapper'>
      <h1 className='profile-page_title'>Profile Page</h1>
      <fieldset className='customer-data__container'>
        <legend>Customer Data</legend>
        <div className='customer-data_item'>
          <label>First Name:</label>
          <span>{firstName}</span>
        </div>
        <div className='customer-data_item'>
          <label>Last Name:</label>
          <span>{lastName}</span>
        </div>
        <div className='customer-data_item'>
          <label>Date Of Birth:</label>
          <span>{dateOfBirth}</span>
        </div>
        <button onClick={() => setModalActive(true)}>Edit profile</button>
        <MyModal
          active={modalActive}
          setActive={setModalActive}/>
      </fieldset>
    </div>
  );
};

export default ProfilePage;
