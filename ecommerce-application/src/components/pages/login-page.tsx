import './pages.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { routes } from '../../types/routingTypes';
import { loginStateChangeProp } from '../../types/routingTypes';
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../app';

function LoginPage({ loginStateChange }: loginStateChangeProp) {
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
    <div className="login-page">
      <h1 onClick={logIn}>This is login page</h1>
      <div>
        <p>Don't have an account?</p>
        <RedirectButton route={routes.REGISTER} text="Click to register" />
      </div>
    </div>
  );
}

export default LoginPage;
