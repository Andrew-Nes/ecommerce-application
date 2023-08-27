import './ProfilePage.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../app';
import { FC } from 'react';
import MyModal from '../../Modal/MyModal';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { GetCustomer } from '../../../api/apiFunctions';

const ProfilePage: FC = () => {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  const accessToken = window.localStorage.getItem('token') || ''

  const [modalActive, setModalActive] = useState(false)
  //const [version, setVersion] = useState(0)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  async function setProfile () {
    try {      
      const response: ClientResponse<Customer> | undefined = await GetCustomer(accessToken)
      //setVersion(response.body.version)
      setFirstName(response?.body.firstName || '')
      setLastName(response?.body.lastName || '')
      setDateOfBirth(response?.body.dateOfBirth || '')
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {if (!isLoggedIn) redirect(routes.LOGIN);}, [isLoggedIn, path, redirect]);
  useEffect(() => {setProfile()},[])

  return (
    <div className='profile-page__wrapper'>
      <h1 className='profile-page_title'>Profile Page</h1>
      <fieldset className='customer-data__container'>
        <legend>Customer Data</legend>
        <div className='customer-data_item'>
          <label className='customer-data-item_label'>First Name:</label>
          <span className='customer-data-item_content'>{firstName}</span>
        </div>
        <div className='customer-data_item'>
          <label className='customer-data-item_label'>Last Name:</label>
          <span className='customer-data-item_content'>{lastName}</span>
        </div>
        <div className='customer-data_item'>
          <label className='customer-data-item_label'>Date Of Birth:</label>
          <span className='customer-data-item_content'>{dateOfBirth}</span>
        </div>
        <button className='edit-profile_button' onClick={() => setModalActive(true)}>Edit profile</button>
        <MyModal
          active={modalActive}
          setActive={setModalActive}/>
      </fieldset>
    </div>
  );
};

export default ProfilePage;
