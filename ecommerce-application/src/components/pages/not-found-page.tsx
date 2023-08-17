import RedirectButton from '../redirect-button/redirect-button';
import './pages.scss';
import { routes } from '../../types/routes';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h2>something went wrong...</h2>
      <RedirectButton route={routes.MAIN} text="Click to return to main page" />
    </div>
  );
}

export default NotFoundPage;
