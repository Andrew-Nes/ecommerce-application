import './ProfilePage.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../App';
import { FC } from 'react';
import ProfileCard from './ProfileCard/ProfileCard';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { GetCustomer } from '../../../api/apiFunctions';
import AddressLists from './AddressList/AddressList';
import { ProfilePageProp } from '../../../types/profilePageTypes';

const ProfilePage: FC<ProfilePageProp> = (props) => {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();

  const [currentCustomer, setCurrentCustomer] = useState<
    Customer | undefined
  >();
  const [isUpdateData, setIsUpdateData] = useState(false);

  async function setProfile() {
    try {
      const response: ClientResponse<Customer> | undefined =
        await GetCustomer();
      setCurrentCustomer(response.body);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      redirect(routes.LOGIN);
    }
  }, [isLoggedIn, path, redirect]);

  useEffect(() => {
    setProfile();
    if (isUpdateData) {
      setIsUpdateData(false);
    }
  }, [isUpdateData]);

  return (
    <div className="profile-page__wrapper">
      <h1>Profile Page</h1>
      <ProfileCard
        loginStateChange={props.loginStateChange}
        isUpdateData={setIsUpdateData}
        currentCustomer={currentCustomer}
      />
      <AddressLists
        currentCustomer={currentCustomer}
        isUpdateData={setIsUpdateData}
        loginStateChange={props.loginStateChange}
      />
    </div>
  );
};

export default ProfilePage;
