import BreadcrumbsList from '../../Breadcrumbs/BreadcrumbsList';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { Category } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { Languages } from '../../../types/commonDataTypes';
import { FC } from 'react';

interface BasicCatalogProps {
  basicCategories: Category[];
}

const BasicCatalog: FC<BasicCatalogProps> = (props: BasicCatalogProps) => {
  const redirect = useNavigate();

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

  return (
    <div className="wrapper catalog-page__wrapper">
      <BreadcrumbsList items={lists} />
      <div>
        <h3 className="heading catalog__heading">Catalog</h3>
        <div className="categories">
          {props.basicCategories.map((category) => (
            <div
              key={category.key}
              className={`category category_${category.key}`}
              onClick={() => redirect(`${category.key}`)}
            >
              <h4 className="heading category__heading">
                {category.name[Languages.ENGLISH]}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCatalog;
