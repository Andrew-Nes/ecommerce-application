import { FC } from 'react';
import {
  headingText,
  paragraphText,
  buttonsText,
} from '../../../types/elementsText';
import { routes } from '../../../types/routingTypes';
import RedirectButton from '../../RedirectButton/RedirectButton';
import './mainPage.scss';
import DiscountCodeCard from './DiscountCodeCard/DiscountCodeCard';
import { DiscountCode } from '@commercetools/platform-sdk';


type MainPageProps = {
  discountCodes: DiscountCode[] | undefined
}

const MainPage: FC<MainPageProps> = (props) => {

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
          <div className="discount-codes__container">
            {props.discountCodes
              ? props.discountCodes.map((code, index) => {
                  if (code.isActive) {
                    return <DiscountCodeCard key={index} discountCode={code} />;
                  }
                })
              : ''}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
