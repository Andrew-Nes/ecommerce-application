import './catalog-page.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';

export default function CatalogPage() {
  return (
    <main className="main catalog-page">
      <div className="wrapper catalog-page__wrapper">
        <ul className="breadcrumbs list">
          <li className="list__item breadcrumbs__item">
            <Link className="breadcrumbs__list" to={routes.MAIN}>
              {anchorsText.MAIN}
            </Link>
          </li>
          <li className="list__item breadcrumbs__item">
            <Link className="breadcrumbs__list" to={routes.CATALOG}>
              {anchorsText.CATALOG}
            </Link>
          </li>
        </ul>
        <div>
          <h3 className="heading catalog__heading">Catalog</h3>
          <div className="categories">
            <div className="category"></div>
            <div className="category"></div>
            <div className="category"></div>
            <div className="category"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
