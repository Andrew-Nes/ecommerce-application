import { FC, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { anchorsText, buttonsText, logoText } from '../../types/elementsText';
import { loginStateChangeProp, routes } from '../../types/routingTypes';
import { LogInContext } from '../App';
import RedirectButton from '../RedirectButton/RedirectButton';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import HeaderMini from './HeaderMini';
import Logo from '../../../assets/img/shopLogo.png';
import './header.scss';

const Header: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const isLoggedIn = useContext(LogInContext);
  const redirect = useNavigate();
  const logout = () => {
    loginStateChange(false);
    window.localStorage.clear();
    redirect(routes.MAIN);
  };
  const path = useLocation();
  const location = window.location.pathname;
  const existingPaths = Object.values(routes) as string[];
  useEffect(() => {}, [path]);
  if (existingPaths.includes(location)) {
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
              </ul>
            </nav>
            <div className="header__buttons">
              {!isLoggedIn ? (
                <RedirectButton
                  className="button header__button header__button_login"
                  text={buttonsText.LOGIN}
                  route={routes.LOGIN}
                />
              ) : (
                <button
                  className="button header__button header__button_login"
                  onClick={logout}
                >
                  {buttonsText.LOGOUT}
                </button>
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
  } else {
    return <HeaderMini />;
  }
};

export default Header;
