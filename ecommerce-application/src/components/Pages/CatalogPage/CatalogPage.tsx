import './catalogPage.scss';
import { Category } from '@commercetools/platform-sdk';
import CatalogHeader from '../../Header/CatalogHeader/CatalogHeader';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

interface CatalogPageProp {
  basicCategories: Category[];
  subCategories: Category[];
}

const CatalogPage: FC<CatalogPageProp> = (props: CatalogPageProp) => {
  return (
    <main className="main catalog-page">
      <CatalogHeader
        mainCategories={props.basicCategories}
        subCategories={props.subCategories}
      />
      <Outlet />
    </main>
  );
};

export default CatalogPage;
