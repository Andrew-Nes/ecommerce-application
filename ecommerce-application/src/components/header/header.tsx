import './header.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../types/routes';
import RedirectButton from '../redirect-button/redirect-button';
import Logo from '../../../assets/img/shopLogo.png';
import { buttonsText, anchorsText, logoText } from '../../types/elementsText';
import BurgerMenu from './BurgerMenu/BurgerMenu';

function Header() {
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
            <RedirectButton
              className="button header__button header__button_login"
              text={buttonsText.LOGIN}
              route={routes.LOGIN}
            />
            <RedirectButton
              className="button header__button header__button_signup"
              text={buttonsText.SIGNUP}
              route={routes.REGISTER}
            />
          </div>
        </div>
        <div className="header__block header__block_logo">
          <BurgerMenu />
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
}

export default Header;
