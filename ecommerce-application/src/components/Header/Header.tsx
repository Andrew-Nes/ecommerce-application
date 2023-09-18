import { FC, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { anchorsText, buttonsText, logoText } from '../../types/elementsText';
import { loginStateChangeProp, routes } from '../../types/routingTypes';
import { LogInContext } from '../App';
import RedirectButton from '../RedirectButton/RedirectButton';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Logo from '../../../assets/img/shopLogo.png';
import './header.scss';
import ProfileIcon from '../../../assets/img/user-profile.svg';
import RedirectIcon from '../RedirectButton/RedirectIcon';
import CartIcon from '../../../assets/img/shopping-cart.svg';
import { CreateCart } from '../../api/apiFunctions';
import tokenStorage from '../../api/tokenStorage';
import { useCartContext } from '../../utils/cartContext';

const Header: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const { cartContextValue, updateCartContextValue } = useCartContext();
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
    <header className="header">
      <div className="wrapper header__wrapper">
        <div className="header__block header__block_links">
          <nav className="nav">
            <ul className="nav__list list">
              <li className="list__item" key="main">
                <Link className="list__link" to={routes.MAIN}>
                  {anchorsText.MAIN}
                </Link>
              </li>
              <li className="list__item" key="catalog">
                <Link className="list__link" to={routes.CATALOG}>
                  {anchorsText.CATALOG}
                </Link>
              </li>
              <li className="list__item" key="about">
                <Link className="list__link" to={routes.ABOUT}>
                  {anchorsText.ABOUT}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__buttons">
            <div className="icon-container">
              <div className="items-in-cart">{cartContextValue}</div>
              <RedirectIcon
                className="profile_icon cart"
                alt={'Cart'}
                route={routes.CART}
                src={CartIcon}
              />
            </div>
            {!isLoggedIn ? (
              <RedirectButton
                className="button header__button header__button_login"
                text={buttonsText.LOGIN}
                route={routes.LOGIN}
              />
            ) : (
              <div className="logged-in-buttons__container">
                <RedirectIcon
                  className="profile_icon"
                  alt={'Profile'}
                  route={routes.PROFILE}
                  src={ProfileIcon}
                />
                <button
                  className="button header__button header__button_login"
                  onClick={logout}
                >
                  {buttonsText.LOGOUT}
                </button>
              </div>
            )}
            <RedirectButton
              className="button header__button header__button_signup"
              text={buttonsText.SIGNUP}
              route={routes.REGISTER}
            />
          </div>
        </div>
        <div className="header__block header__block_logo">
          <BurgerMenu loginStateChange={loginStateChange} />
          <div className="logo">
            <Link className="logo__link" to={routes.MAIN}>
              <img src={Logo} alt="Logo" className="logo__image" />
              <p className="logo__text">{logoText.LOGO}</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
