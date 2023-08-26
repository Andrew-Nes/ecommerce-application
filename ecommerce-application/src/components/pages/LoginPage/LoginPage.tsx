import './loginPage.scss';
import { Link } from 'react-router-dom';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import { routes } from '../../../types/routingTypes';
import { anchorsText, paragraphText } from '../../../types/elementsText';
import { loginStateChangeProp } from '../../../types/routingTypes';
import { FC, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../App';

const LoginPage: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  function logIn() {
    loginStateChange(true);
  }
  useEffect(() => {
    if (isLoggedIn) {
      redirect(routes.MAIN);
    }
  }, [isLoggedIn, path, redirect]);
  return (
    <main className="main login-page">
      <div className="wrapper login-page__wrapper">
        <LoginForm logIn={logIn} />
        <p className="text login__text">
          {paragraphText.LOGIN_PAGE_PARAGRAPH}
          <span>
            <Link to={routes.REGISTER} className="login__anchor">
              {anchorsText.CREATE_NEW_ACCOUNT}
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
