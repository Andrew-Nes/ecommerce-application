import { Link } from 'react-router-dom';
import { routes } from '../../types/routes';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import { MouseEventHandler } from 'react';

function Header() {
  const redirect = useNavigate();
  const redirectToRegister: MouseEventHandler = () => {
    redirect(routes.REGISTER);
  };
  const redirectToLogIn: MouseEventHandler = () => {
    redirect(routes.LOGIN);
  };
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
          <button
            className="navigation__button-register"
            key="login"
            onClick={redirectToLogIn}
          >
            LogIn
          </button>
          <button
            className="navigation__button-register"
            key="register"
            onClick={redirectToRegister}
          >
            Register
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
