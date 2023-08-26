import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logoText } from '../../types/elementsText';
import { routes } from '../../types/routingTypes';
import Logo from '../../../assets/img/shopLogo.png';

const HeaderMini: FC = () => {
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
};

export default HeaderMini;
