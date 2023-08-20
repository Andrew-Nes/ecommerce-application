import './pages.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { routes } from '../../types/routingTypes';
import { loginStateChangeProp } from '../../types/routingTypes';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInContext } from '../app';

function LoginPage({ loginStateChange }: loginStateChangeProp) {
  const isLoggedIn = useContext(LogInContext);
  const redirect = useNavigate();
  function logIn() {
    loginStateChange(true);
  }
  if (isLoggedIn) {
    redirect(routes.MAIN);
  } else {
    return (
      <div className="login-page">
        <h1 onClick={logIn}>This is login page</h1>
        <div>
          <p>Don't have an account?</p>
          <RedirectButton route={routes.REGISTER} text="Click to register" />
        </div>
      </div>
    );
  }
}

export default LoginPage;
