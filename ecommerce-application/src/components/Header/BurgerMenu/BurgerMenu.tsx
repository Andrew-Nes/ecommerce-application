import { FC, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { anchorsText } from '../../../types/elementsText';
import { loginStateChangeProp, routes } from '../../../types/routingTypes';
import { LogInContext } from '../../App';
import BurgerButton from './BurgerButton';
import './burgerMenu.scss';
import { CreateCart } from '../../../api/apiFunctions';
import tokenStorage from '../../../api/tokenStorage';
import { useCartContext } from '../../../utils/cartContext';

const BurgerMenu: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const { updateCartContextValue } = useCartContext();
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const isLoggedIn = useContext(LogInContext);
  const redirect = useNavigate();

  async function createNewCart() {
    try {
      const cart = await CreateCart();
      window.localStorage.setItem('cartId', cart.body.id);
    } catch {
      throw new Error('crateNewCart');
    }
  }

  const logout = async () => {
    loginStateChange(false);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('IsLoggedIn');
    window.localStorage.removeItem('cartId');
    tokenStorage.clear();
    await createNewCart();
    updateCartContextValue(0);
    redirect(routes.MAIN);
  };

  return (
    <div className="burger-menu">
      <nav className={`burger__nav ${open ? 'burger__nav_open' : ''}`}>
        <Link className="burger__link" to={routes.MAIN} onClick={() => close()}>
          {anchorsText.MAIN}
        </Link>
        <Link
          className="burger__link"
          to={routes.CATALOG}
          onClick={() => close()}
        >
          {anchorsText.CATALOG}
        </Link>
        <Link
          className="burger__link"
          to={routes.ABOUT}
          onClick={() => close()}
        >
          {anchorsText.ABOUT}
        </Link>
        <Link className="burger__link" to={routes.CART} onClick={() => close()}>
          {anchorsText.CART}
        </Link>
        {!isLoggedIn ? (
          <Link
            className="burger__link"
            to={routes.LOGIN}
            onClick={() => close()}
          >
            {anchorsText.LOGIN}
          </Link>
        ) : (
          <div className="logged-in-links__container">
            <Link
              className="burger__link"
              to={routes.PROFILE}
              onClick={() => close()}
            >
              {anchorsText.PROFILE}
            </Link>
            <Link
              className="burger__link"
              to={routes.MAIN}
              onClick={() => {
                logout();
                close();
              }}
            >
              {anchorsText.LOGOUT}
            </Link>
          </div>
        )}
        <Link
          className="burger__link"
          to={routes.REGISTER}
          onClick={() => close()}
        >
          {anchorsText.SIGNUP}
        </Link>
      </nav>
      <BurgerButton open={open} setOpen={setOpen} />
    </div>
  );
};

export default BurgerMenu;
