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

const ProfilePage: FC = () => {
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
  }, [isUpdateData]);

  return (
    <div className="profile-page__wrapper">
      <h1>Profile Page</h1>
      <ProfileCard
        isUpdateData={setIsUpdateData}
        currentCustomer={currentCustomer}
      />
      <AddressLists
        currentCustomer={currentCustomer}
        isUpdateData={setIsUpdateData}
      />
    </div>
  );
};

export default ProfilePage;
