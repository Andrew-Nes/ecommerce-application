import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../types/breadcrumbsTypes';
import { routes } from '../../types/routingTypes';
import { anchorsText } from '../../types/elementsText';
import BreadcrumbsList from '../BreadcrumbsList';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Languages } from '../../types/commonDataTypes';
import { useEffect, useState } from 'react';
import { getItems } from '../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';

interface CategoryCatalogProps {
  categories: Category[];
}

const CategoryCatalog = (props: CategoryCatalogProps) => {
  const { categoryKey } = useParams();
  const redirect = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [isLoading, setState] = useState<boolean>(true);

  const category = props.categories.find(
    (category) => category.key === categoryKey
  );
  const categoryId = category?.id;
  const categoryName = category?.name[Languages.ENGLISH];

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
      key: `${categoryKey}`,
      route: ``,
      name: `${categoryName}`,
    },
  ];

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (props.categories.length === 0) {
      return;
    }
    if (!category) {
      redirect(routes.CATALOG);
      return;
    }
    const fetchData = async () => {
      const response = await getItems(categoryId);
      const products = response.body.results;
      setProducts(products);
      setState(false);
    };
    fetchData();
  }, [getItems, props]);

  if (props.categories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </div>
    );
  } else {
    return <TailSpin wrapperClass="loader-spinner" />;
  }
};

export default CategoryCatalog;
