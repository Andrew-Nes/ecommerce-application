import { Link } from 'react-router-dom';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';

export default function CatalogPage() {
  return (
    <main className="main catalog-page">
      <div className="wrapper catalog-page__wrapper">
        <ul className="breadcrumbs">
          <li>
            <Link to={routes.MAIN}>{anchorsText.MAIN}</Link>
          </li>
          <li>
            <Link to={routes.CATALOG}>{anchorsText.CATALOG}</Link>
          </li>
        </ul>
        <div>
          <h3>Catalog</h3>
          <div className="categories">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
