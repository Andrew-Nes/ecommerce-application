import './pages.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { routes } from '../../types/routes';

function RegistrationPage() {
  return (
    <div className="registration-page">
      <h1>This is register page</h1>
      <div>
        <p>Already registered?</p>
        <RedirectButton route={routes.LOGIN} text="Click to LogIn" />
      </div>
    </div>
  );
}

export default RegistrationPage;
