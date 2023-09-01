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
import { filtersCheckboxes } from '../../../types/categoryTypes';
import getMinMaxPrice from '../../../utils/minMaxPrice';
import NonExistentProducts from '../NonExistingProducts.tsx/NonExistentProducts';
import createFilterObject from '../../../utils/filterCreation';

interface SubcategoryProps {
  mainCategories: Category[];
  subCategories: Category[];
}

const Subcategory: FC<SubcategoryProps> = (props: SubcategoryProps) => {
  const { currentSubCategoryKey } = useParams();
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProjection[]>(
    []
  );
  const [isProductLoading, setProductLoading] = useState<boolean>(true);
  const [chosenFilter, setChosenFilter] = useState<filtersCheckboxes>({});
  const redirect = useNavigate();

  const currentCategory = props.subCategories.find(
    (category) => category.key === currentSubCategoryKey
  );
  const currentCategoryId = currentCategory?.id;
  const currentCategoryName = currentCategory?.name[Languages.ENGLISH];

  const parentCategoryId = currentCategory?.parent?.id;
  const parentCategory = props.mainCategories.find(
    (category) => category.id === parentCategoryId
  );
  const parentCategoryName = parentCategory?.name[Languages.ENGLISH];
  const parentCategoryKey = parentCategory?.key;

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
      key: `${parentCategoryKey}`,
      route: `..`,
      name: `${parentCategoryName}`,
    },
    {
      key: `${currentSubCategoryKey}`,
      route: ``,
      name: `${currentCategoryName}`,
    },
  ];

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (props.subCategories.length === 0) {
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
      }
    };
    fetchData();
  }, [getItems, props, currentCategory]);

  useEffect(() => {
    if (props.subCategories.length === 0) {
      return;
    }
    setProductLoading(true);
    const fetchData = async () => {
      try {
        const response = await getFilteredItems(
          currentCategoryId,
          chosenFilter
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
  }, [getFilteredItems, chosenFilter]);

  if (props.subCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar
            filters={filters}
            prices={prices}
            setFilters={setChosenFilter}
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

export default Subcategory;
