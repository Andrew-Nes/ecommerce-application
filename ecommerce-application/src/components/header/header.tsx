import { Link, useLocation } from 'react-router-dom';
import { loginStateChangeProp, routes } from '../../types/routingTypes';
import './header.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { LogInContext } from '../app';
import { MouseEventHandler, useContext, useEffect } from 'react';

function Header({ loginStateChange }: loginStateChangeProp) {
  const isLoggedIn = useContext(LogInContext);
  const logout: MouseEventHandler = () => {
    loginStateChange(false);
    window.localStorage.clear();
  };
  console.log(window.localStorage);
  const path = useLocation();
  const location = window.location.pathname;
  const existingPaths = Object.values(routes).join('-').split('-');
  useEffect(() => {}, [path]);
  if (existingPaths.includes(location)) {
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
            {!isLoggedIn ? (
              <RedirectButton text="LogIn" route={routes.LOGIN} />
            ) : (
              <button onClick={logout}>LogOut</button>
            )}
            <RedirectButton text="Register" route={routes.REGISTER} />
          </div>
        </nav>
      </header>
    );
  } else {
    return <h1>Alternative header</h1>;
  }
}

export default Header;
