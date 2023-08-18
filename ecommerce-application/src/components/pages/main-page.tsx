import './pages.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { routes } from '../../types/routes';

function MainPage() {
  return (
    <div className="main-page">
      <h1>This is main page</h1>
      <div>
        <p>U are not logged in, click one of the buttons below to continue.</p>
        <RedirectButton route={routes.REGISTER} text="Click to Register" />
        <RedirectButton route={routes.LOGIN} text="Click to LogIn" />
      </div>
    </div>
  );
}

export default MainPage;
