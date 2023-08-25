import './catalogPage.scss';
// import { Link } from 'react-router-dom';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import { Category } from '@commercetools/platform-sdk';
import CatalogHeader from '../../header/CatalogHeader/CatalogHeader';
import BreadcrumbsList from '../../BreadcrumbsList';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';

interface CatalogPageProp {
  categories: Category[];
}

const lists: BreadcrumbsItem[] = [
  {
    key: 'main',
    route: routes.MAIN,
    name: anchorsText.MAIN,
  },
  {
    key: 'catalog',
    route: routes.CATALOG,
    name: anchorsText.CATALOG,
  },
];

export default function CatalogPage(props: CatalogPageProp) {
  return (
    <main className="main catalog-page">
      <CatalogHeader categories={props.categories} />
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
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
