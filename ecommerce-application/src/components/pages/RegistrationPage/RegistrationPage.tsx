import './registrationPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { anchorsText, paragraphText } from '../../../types/elementsText';
import RegistrationForm from '../../Forms/RegistrationForm/RegistrationForm';
import { routes, loginStateChangeProp } from '../../../types/routingTypes';
import { FC } from 'react';

const RegistrationPage: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const redirect = useNavigate();
  const logIn = () => {
    loginStateChange(true);
    redirect(routes.MAIN);
  };

  return (
    <main className="main registration-page">
      <div className="wrapper login-page__wrapper">
        <RegistrationForm logIn={logIn} />
        <p className="text registration__text">
          {paragraphText.REGISTRATION_PAGE_PARAGRAPH}
          <span>
            <Link to={routes.LOGIN} className="registration__anchor">
              {anchorsText.LOGIN_CLICK}
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default RegistrationPage;
