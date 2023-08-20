import './login-page.scss';
import { Link } from 'react-router-dom';
import LoginForm from '../../forms/loginForm/loginForm';
import { routes } from '../../../types/routes';
import { anchorsText, paragraphText } from '../../../types/elementsText';

function LoginPage() {
  return (
    <main className="main login-page">
      <div className="wrapper login-page__wrapper">
        <LoginForm />
        <p className="text login__text">
          {paragraphText.LOGIN_PAGE_PARAGRAPH}
          <span>
            <Link to={routes.REGISTER} className="login__anchor">
              {anchorsText.CREATE_NEW_ACCOUNT}
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
