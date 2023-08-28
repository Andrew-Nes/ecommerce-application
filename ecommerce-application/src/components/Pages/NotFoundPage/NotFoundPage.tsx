import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  headingText,
  paragraphText,
  anchorsText,
} from '../../../types/elementsText';
import { routes } from '../../../types/routingTypes';
import './notFoundPage.scss';
import notFountImage from '../../../../assets/img/404-page-image1.png';

const NotFoundPage: FC = () => {
  return (
    <main className="main not-found-page">
      <div className="wrapper not-found-page__wrapper">
        <div className="not-found-page__block block_text">
          <h1 className="heading not-found__heading">
            {headingText.NOT_FOUND_PAGE_HEADING}
          </h1>
          <p className="text not-found__text">
            {paragraphText.NOT_FOUND_PAGE_PARAGRAPH_1}
          </p>
          <Link className="not-found__anchor" to={routes.MAIN}>
            {anchorsText.NOT_FOUND_CLICK}
          </Link>
        </div>
        <div className="not-found-page__block block_image">
          <img
            src={notFountImage}
            alt="Not found image"
            className="not-found-page__image"
          />
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
