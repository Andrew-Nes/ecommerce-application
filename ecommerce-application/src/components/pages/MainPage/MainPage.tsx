import './mainPage.scss';
import RedirectButton from '../../RedirectButton/RedirectButton';
import { routes } from '../../../types/routingTypes';
import {
  buttonsText,
  headingText,
  paragraphText,
} from '../../../types/elementsText';
import { FC } from 'react';

const MainPage: FC = () => {
  return (
    <main className="main main-page">
      <div className="wrapper main-page__wrapper">
        <h2 className="heading main__heading">
          {headingText.MAIN_PAGE_HEADING}
        </h2>
        <div className="main__content">
          <p className="text main__text">{paragraphText.MAIN_PAGE_PARAGRAPH}</p>
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
  );
};

export default MainPage;
