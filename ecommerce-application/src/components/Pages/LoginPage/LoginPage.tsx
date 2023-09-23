import { FC, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { paragraphText, anchorsText } from '../../../types/elementsText';
import { loginStateChangeProp, routes } from '../../../types/routingTypes';
import { LogInContext } from '../../App';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import './loginPage.scss';
import { GetActiveCart } from '../../../api/apiFunctions';
import { useCartContext } from '../../../utils/cartContext';

const LoginPage: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const { updateCartContextValue } = useCartContext();
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  async function logIn() {
    loginStateChange(true);
    const cartResp = await GetActiveCart();
    const items = cartResp.body.lineItems.reduce(
      (acc, el) => acc + el.quantity,
      0
    );
    updateCartContextValue(items);
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
