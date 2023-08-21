import './header.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../types/routingTypes';
import RedirectButton from '../redirect-button/redirect-button';
import Logo from '../../../assets/img/shopLogo.png';
import { buttonsText, anchorsText, logoText } from '../../types/elementsText';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import HeaderMini from './headerMini';
import { LogInContext } from '../app';
import { useContext, useEffect } from 'react';
import { loginStateChangeProp } from '../../types/routingTypes';

function Header({ loginStateChange }: loginStateChangeProp) {
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
}

export default Header;
