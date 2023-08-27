import './catalogPage.scss';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import { Category } from '@commercetools/platform-sdk';
import BreadcrumbsList from '../../BreadcrumbsList';
import CatalogHeader from '../../header/CatalogHeader/CatalogHeader';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { useNavigate } from 'react-router-dom';
import { Languages } from '../../../types/commonDataTypes';
import { FC } from 'react';

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

const CatalogPage: FC<CatalogPageProp> = (props: CatalogPageProp) => {
  const redirect = useNavigate();
  const mainCategories = props.categories.filter(
    (category) => !category.parent
  );
  const subCategories = props.categories.filter((category) => category.parent);

  return (
    <main className="main catalog-page">
      <CatalogHeader
        mainCategories={mainCategories}
        subCategories={subCategories}
      />
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div>
          <h3 className="heading catalog__heading">Catalog</h3>
          <div className="categories" onClick={() => redirect(routes.CATALOG)}>
            {mainCategories.map((category) => (
              <div
                key={category.key}
                className={`category category_${category.key}`}
              >
                <h4 className="heading category__heading">
                  {category.name[Languages.ENGLISH]}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CatalogPage;
