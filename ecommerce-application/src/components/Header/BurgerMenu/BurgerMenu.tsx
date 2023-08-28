import { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { anchorsText } from '../../../types/elementsText';
import { loginStateChangeProp, routes } from '../../../types/routingTypes';
import { LogInContext } from '../../App';
import BurgerButton from './BurgerButton';
import './burgerMenu.scss';

const BurgerMenu: FC<loginStateChangeProp> = ({ loginStateChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const isLoggedIn = useContext(LogInContext);
  const logout = () => {
    loginStateChange(false);
    window.localStorage.clear();
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
