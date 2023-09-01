import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import BreadcrumbsList from '../../BreadcrumbsList';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { FC, useEffect, useState } from 'react';
import { getFilteredItems, getItems } from '../../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';
import Sidebar from '../../Sidebar/Sidebar';
import createFilterObject from '../../../utils/filterCreation';
import getMinMaxPrice from '../../../utils/minMaxPrice';
import { filtersCheckboxes } from '../../../types/categoryTypes';
import NonExistentProducts from '../NonExistingProducts.tsx/NonExistentProducts';

interface BasicCategoryProps {
  basicCategories: Category[];
  subCategories: Category[];
}

const BasicCategory: FC<BasicCategoryProps> = (props: BasicCategoryProps) => {
  const { currentCategoryKey } = useParams();
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProjection[]>(
    []
  );
  const [isProductLoading, setProductLoading] = useState<boolean>(true);
  const [chosenFilter, setChosenFilter] = useState<filtersCheckboxes>({});
  const [priceRange, setPriceRange] = useState<[number, number]>();
  const redirect = useNavigate();

  const currentCategory = props.basicCategories.find(
    (category) => category.key === currentCategoryKey
  );
  const currentCategoryId = currentCategory?.id;
  const currentCategoryName = currentCategory?.name[Languages.ENGLISH];

  const childCategories = props.subCategories.filter(
    (subCategory) => subCategory.parent?.id === currentCategory?.id
  );

  const filters = createFilterObject(allProducts);
  const prices = getMinMaxPrice(allProducts);

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
        setAllProducts(products);
        setFilteredProducts(products);
        setProductLoading(false);
      } catch (error) {
        // TODO
        // handle error
        console.log('ERROR', error);
      }
    };
    fetchData();
  }, [getItems, props, currentCategory]);

  useEffect(() => {
    if (props.basicCategories.length === 0) {
      return;
    }
    setProductLoading(true);
    const fetchData = async () => {
      try {
        const response = await getFilteredItems(
          currentCategoryId,
          chosenFilter,
          priceRange
        );
        const filteredProducts = response.body.results;
        setFilteredProducts(filteredProducts);
        setProductLoading(false);
      } catch (error) {
        // TODO
        // handle error
        console.log('ERROR', error);
      }
    };
    fetchData();
  }, [getFilteredItems, chosenFilter, priceRange]);

  if (props.basicCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar
            childCategories={childCategories}
            filters={filters}
            prices={prices}
            setFilters={setChosenFilter}
            setPrice={setPriceRange}
            priceRange={priceRange}
          />
          {isProductLoading ? (
            <TailSpin wrapperClass="loader-spinner" />
          ) : (
            <div className="cards">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const image: string =
                    product.masterVariant.images?.[0]?.url || '';
                  return (
                    <div className="card" key={product.id} id={product.id}>
                      <img className="card__image" src={image} />
                      <h3 className="card__heading">
                        {product.name[Languages.ENGLISH]}
                      </h3>
                      <p className="card__description">
                        {product.description?.[Languages.ENGLISH]}
                      </p>
                      <p className="card__price">
                        {product.masterVariant.price?.value.centAmount}
                      </p>
                    </div>
                  );
                })
              ) : (
                <NonExistentProducts />
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <TailSpin wrapperClass="loader-spinner" />;
  }
};

export default BasicCategory;
