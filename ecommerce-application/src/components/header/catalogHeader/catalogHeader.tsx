import './catalogHeader.scss';
import { Category } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { Link } from 'react-router-dom';
import { routes } from '../../../types/routingTypes';

interface CatalogHeaderProp {
  categories: Category[];
}

export default function CatalogHeader(props: CatalogHeaderProp) {
  return (
    <header className="catalog__header">
      <ul className="list catalog__header__list">
        {props.categories.map((category) => (
          <li className="list__item catalog__header__item" key={category.key}>
            <Link
              className="list__link catalog__header__link"
              to={routes.CATALOG}
            >
              {category.name[Languages.ENGLISH]}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
