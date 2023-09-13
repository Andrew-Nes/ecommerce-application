import './ProfilePage.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../App';
import { FC } from 'react';
import ProfileCard from './ProfileCard/ProfileCard';
import {
  ClientResponse,
  Customer,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import { GetCustomer } from '../../../api/apiFunctions';
import AddressLists from './AddressList/AddressList';
import { ProfilePageProp } from '../../../types/profilePageTypes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { popupText } from '../../../types/elementsText';
import { serviceErrors, errorsMessage } from '../../../types/formTypes';
import { reloadPage } from '../../../utils/apiHelpers';

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
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      const errorCode = errorResponse.body.statusCode;
      const errorMessage = errorResponse.body.message;

      if (errorMessage === serviceErrors.DUPLICATE_FIELD) {
        toast.error(errorsMessage.TOAST_EMAIL_EXIST, {
          position: 'bottom-center',
        });
      } else if (
        errorCode === serviceErrors.INVALID_CUSTOMER_CREDENTIALS &&
        errorMessage !== serviceErrors.DUPLICATE_FIELD
      ) {
        toast.error(popupText.REGISTRATION_FAIL, {
          position: 'bottom-center',
        });
      }
      if (
        errorCode === serviceErrors.SERVICE_UNAVAILABLE ||
        errorCode === serviceErrors.BAD_GATEWAY ||
        errorCode === serviceErrors.INTERNAL_SERVER_ERROR
      ) {
        toast.info(errorsMessage.TOAST_SERVER_ERROR, {
          position: 'bottom-center',
        });
      }
      if (errorCode === serviceErrors.INVALID_TOKEN) {
        reloadPage();
      }
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
