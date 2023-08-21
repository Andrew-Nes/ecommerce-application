import './burgerMenu.scss';
import { MouseEventHandler, useContext, useState } from 'react';
import BurgerButton from './BurgerButton';
import { Link } from 'react-router-dom';
import { loginStateChangeProp, routes } from '../../../types/routingTypes';
import { LogInContext } from '../../app';

export default function BurgerMenu({ loginStateChange }: loginStateChangeProp) {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const isLoggedIn = useContext(LogInContext);
  const logout: MouseEventHandler = () => {
    loginStateChange(false);
    window.localStorage.clear();
  };

  return (
    <div className="burger-menu">
      <nav className={`burger__nav ${open ? 'burger__nav_open' : ''}`}>
        <Link className="burger__link" to={routes.MAIN} onClick={() => close()}>
          Main
        </Link>
        {!isLoggedIn ? (
          <Link
            className="burger__link"
            to={routes.LOGIN}
            onClick={() => close()}
          >
            Login
          </Link>
        ) : (
          <Link
            className="burger__link"
            to={routes.MAIN}
            onClick={() => {
              logout;
              close();
            }}
          >
            Logout
          </Link>
        )}
        <Link
          className="burger__link"
          to={routes.REGISTER}
          onClick={() => close()}
        >
          Sign up
        </Link>
      </nav>
      <BurgerButton open={open} setOpen={setOpen} />
    </div>
  );
}
