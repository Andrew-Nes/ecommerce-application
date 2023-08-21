import './registration-page.scss';
import { Link } from 'react-router-dom';
import { anchorsText, paragraphText } from '../../../types/elementsText';
import RegistrationForm from '../../forms/RegistrationForm/RegistrationForm';
import { routes } from '../../../types/routingTypes';

function RegistrationPage() {
  return (
    <main className="main registration-page">
      <div className="wrapper login-page__wrapper">
        <RegistrationForm />
        <p className="text registration__text">
          {paragraphText.REGISTRATION_PAGE_PARAGRAPH}
          <span>
            <Link to={routes.LOGIN} className="registration__anchor">
              {anchorsText.LOGIN}
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
}

export default RegistrationPage;
