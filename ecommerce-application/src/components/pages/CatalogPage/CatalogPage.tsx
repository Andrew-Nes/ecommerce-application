import './catalogPage.scss';
import { Category } from '@commercetools/platform-sdk';
import CatalogHeader from '../../Header/CatalogHeader/CatalogHeader';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

interface CatalogPageProp {
  categories: Category[];
}

const CatalogPage: FC<CatalogPageProp> = (props: CatalogPageProp) => {
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
      <Outlet />
    </main>
  );
};

export default CatalogPage;
