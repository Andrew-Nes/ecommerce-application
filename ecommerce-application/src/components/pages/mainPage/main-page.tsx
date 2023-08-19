import './main-page.scss';
import RedirectButton from '../../redirect-button/redirect-button';
import { routes } from '../../../types/routes';
import {
  buttonsText,
  headingText,
  paragraphText,
} from '../../../types/elementsText';
import Header from '../../header/header';

function MainPage() {
  return (
    <div>
      <Header />
      <main className="main main-page">
        <div className="wrapper main-page__wrapper">
          <h2 className="heading main__heading">
            {headingText.MAIN_PAGE_HEADING}
          </h2>
          <div className="main__content">
            <p className="text main__text">
              {paragraphText.MAIN_PAGE_PARAGRAPH}
            </p>
            <div className="main__buttons">
              <RedirectButton
                className="button main__button main__button_signup"
                route={routes.REGISTER}
                text={buttonsText.SIGNUP}
              />
              <RedirectButton
                className="button main__button main__button_login"
                route={routes.LOGIN}
                text={buttonsText.LOGIN}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
