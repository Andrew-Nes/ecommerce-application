import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import BreadcrumbsList from '../../BreadcrumbsList';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { FC, useEffect, useState } from 'react';
import { getItems } from '../../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';
import Sidebar from '../../Sidebar/Sidebar';
import createFilterObject from '../../../utils/filterCreation';
import getMinMaxPrice from '../../../utils/minMaxPrice';

interface BasicCategoryProps {
  basicCategories: Category[];
  subCategories: Category[];
}

const BasicCategory: FC<BasicCategoryProps> = (props: BasicCategoryProps) => {
  const { currentCategoryKey } = useParams();
  const redirect = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [isLoading, setState] = useState<boolean>(true);

  const currentCategory = props.basicCategories.find(
    (category) => category.key === currentCategoryKey
  );
  const currentCategoryId = currentCategory?.id;
  const currentCategoryName = currentCategory?.name[Languages.ENGLISH];

  const childCategories = props.subCategories.filter(
    (subCategory) => subCategory.parent?.id === currentCategory?.id
  );

  const filters = createFilterObject(products);
  const prices = getMinMaxPrice(products);

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
    {
      key: `${currentCategoryKey}`,
      route: ``,
      name: `${currentCategoryName}`,
    },
  ];

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (props.basicCategories.length === 0) {
      return;
    }
    if (!currentCategory) {
      redirect(routes.CATALOG);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await getItems(currentCategoryId);
        const products = response.body.results;
        setProducts(products);
        setState(false);
      } catch (error) {
        // TODO
        // handle error
      }
    };
    fetchData();
  }, [getItems, props, currentCategory]);

  if (props.basicCategories.length > 0) {
    // if (category) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        {isLoading ? (
          <TailSpin wrapperClass="loader-spinner" />
        ) : (
          <div className="catalog_content">
            <Sidebar
              childCategories={childCategories}
              filters={filters}
              prices={prices}
            />
            <div className="cards">
              {products.map((product) => {
                const image: string =
                  product.masterVariant.images?.[0]?.url || '';
                return (
                  <div className="card">
                    <img className="card__image" src={image} />
                    <h3 className="card__heading">
                      {product.name[Languages.ENGLISH]}
                    </h3>
                    <p className="card__descroption">
                      {product.description?.[Languages.ENGLISH]}
                    </p>
                    <p className="card__price">
                      {product.masterVariant.price?.value.centAmount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
    // } else {
    //   return (
    //     <NonExistentCategory />
    //   )
    // }
  } else {
    return <TailSpin wrapperClass="loader-spinner" />;
  }
};

export default BasicCategory;
