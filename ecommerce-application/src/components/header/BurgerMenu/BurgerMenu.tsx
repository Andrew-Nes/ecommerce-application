import './burgerMenu.scss';
import { useState } from 'react';
import BurgerButton from './BurgerButton';
import { Link } from 'react-router-dom';
import { routes } from '../../../types/routes';

export default function BurgerMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  return (
    <div className="burger-menu">
      <nav className={`burger__nav ${open ? 'burger__nav_open' : ''}`}>
        <Link className="burger__link" to={routes.MAIN} onClick={() => close()}>
          Main
        </Link>
        <Link
          className="burger__link"
          to={routes.LOGIN}
          onClick={() => close()}
        >
          Login
        </Link>
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
