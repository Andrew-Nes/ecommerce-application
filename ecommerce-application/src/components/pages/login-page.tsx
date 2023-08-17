import './pages.scss';
import RedirectButton from '../redirect-button/redirect-button';
import { routes } from '../../types/routes';

function LoginPage() {
  return (
    <div className="login-page">
      <h1>This is login page</h1>
      <div>
        <p>Don't have an account?</p>
        <RedirectButton route={routes.REGISTER} text="Click to register" />
      </div>
    </div>
  );
}

export default LoginPage;
