import './burgerMenu.scss';
import { FC, useContext, useState } from 'react';
import BurgerButton from './BurgerButton';
import { Link } from 'react-router-dom';
import { loginStateChangeProp, routes } from '../../../types/routingTypes';
import { LogInContext } from '../../App';
import { anchorsText } from '../../../types/elementsText';

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
        {!isLoggedIn ? (
          <Link
            className="burger__link"
            to={routes.LOGIN}
            onClick={() => close()}
          >
            {anchorsText.LOGIN}
          </Link>
        ) : (
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
