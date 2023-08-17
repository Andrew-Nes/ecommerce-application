import { Link } from 'react-router-dom';
import { routes } from '../../types/routes';
import './header.scss';
import RedirectButton from '../redirect-button/redirect-button';

function Header() {
  return (
    <header className="header">
      <Link to={routes.MAIN}>
        <div className="logo">
          <img src="" alt="LOGO image here" className="logo__image" />
          <p className="logo__text">LOGO text here</p>
        </div>
      </Link>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__list-item" key="main">
            <Link to={routes.MAIN}>Main</Link>
          </li>
        </ul>
        <div className="navigation__buttons">
          <RedirectButton text="LogIn" route={routes.LOGIN} />
          <RedirectButton text="Register" route={routes.REGISTER} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
