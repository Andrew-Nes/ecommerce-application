import './ProfilePage.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../app';
import { FC } from 'react';
import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { GetCustomer } from '../../../api/apiFunctions';
import ProfileCard from './ProfileCard/ProfileCard';
import AddressLists from './AddressLists/AddressLists';

const ProfilePage: FC = () => {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  const accessToken = window.localStorage.getItem('token') || '';

  const [version, setVersion] = useState('0')

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('')

  const addressArray: Address[] = []
  const [addresses, setAddresses] = useState(addressArray)

  const AddressIds: string[] = [] 
  const [shippingAddresses, setShippingAddresses] = useState(AddressIds)
  const [billingAddresses, setBillingAddresses] = useState(AddressIds)

  const [defaultSipping, setDefaultShipping] = useState('null')
  const [defaultBilling, setDefaultBilling] = useState('')

  const [isUpdateData, setIsUpdateData] = useState(false)

  async function setProfile() {
    try {
      const response: ClientResponse<Customer> | undefined = await GetCustomer(
        accessToken
      );
      setVersion(response.body.version.toString())
      setFirstName(response.body.firstName || '');
      setLastName(response.body.lastName || '');
      setDateOfBirth(response.body.dateOfBirth || '');
      setEmail(response.body.email)
      
      setAddresses(response.body.addresses)

      setShippingAddresses(response.body.shippingAddressIds || AddressIds)
      setBillingAddresses(response.body.billingAddressIds || AddressIds)

      setDefaultShipping(response.body.defaultShippingAddressId || '')
      setDefaultBilling(response.body.defaultBillingAddressId || '')


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
      setIsUpdateData(false)
    }
  }, [isUpdateData]);

  return (
    <div className="profile-page__wrapper">
      <h1 className="profile-page_title">Profile Page</h1>
        <ProfileCard
        version={version}
        firstName={firstName}
        lastName={lastName}
        dateOfBirth={dateOfBirth}
        email={email}
        isUpdateData={setIsUpdateData}/>

        <AddressLists 
        version={version}
        addresses={addresses}
        shippingAddresses={shippingAddresses}
        billingAddresses={billingAddresses}
        defaultBilling={defaultBilling}
        defaultShipping={defaultSipping}
        isUpdateData={setIsUpdateData}
        />
    </div>
  );
};

export default ProfilePage;
