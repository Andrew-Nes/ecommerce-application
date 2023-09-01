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
import NonExistentProducts from '../NonExistingProducts.tsx/NonExistentProducts';
import createFilterObject from '../../../utils/filterCreation';
import SortForm from '../../Forms/SortForm/SortForm';

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
  const [sortingVariant, setSortingVariant] =
    useState<string>('name.en-US asc');
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
        const response = await getItems(currentCategoryId, sortingVariant);
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
          sortingVariant,
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
  }, [getFilteredItems, chosenFilter, sortingVariant]);

  if (props.subCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar filters={filters} setFilters={setChosenFilter} />
          {isProductLoading ? (
            <TailSpin wrapperClass="loader-spinner" />
          ) : (
            <div className="cards__wrapper">
              <div className="cards__header">
                <p className="text">{`${filteredProducts.length} Results`}</p>
                <SortForm
                  setSorting={setSortingVariant}
                  sortString={sortingVariant}
                />
              </div>
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
                        <div className="prices__wrapper">
                          <p className="card__price card__price_current text">
                            {product.masterVariant.price
                              ? `$${
                                  product.masterVariant.price.value.centAmount /
                                  100
                                }`
                              : ''}
                          </p>
                          {product.masterVariant.price?.discounted && (
                            <p className="card__price text">
                              {product.masterVariant.price.discounted.value
                                .centAmount / 100}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NonExistentProducts />
                )}
              </div>
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
