import './header.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../types/routes';
import Logo from '../../../assets/img/shopLogo.png';
import { logoText } from '../../types/elementsText';

function HeaderMini() {
  return (
    <header className="header-mini">
      <div className="wrapper header-mini__wrapper">
        <div className="header-mini__block header-mini__block_logo">
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

export default HeaderMini;
