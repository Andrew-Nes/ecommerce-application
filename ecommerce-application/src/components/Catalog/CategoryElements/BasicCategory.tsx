import { useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import BreadcrumbsList from '../../Breadcrumbs/BreadcrumbsList';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { FC, useEffect, useState } from 'react';
import { getFilteredItems, getItems } from '../../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';
import Sidebar from '../../Sidebar/Sidebar';
import createFilterObject from '../../../utils/filterCreation';
import { filtersCheckboxes } from '../../../types/categoryTypes';
import { SortingVariants } from '../../../types/formTypes';
import Cards from '../../Cards/Cards';
import NotFoundPage from '../../Pages/NotFoundPage/NotFoundPage';

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
  const [sortingVariant, setSortingVariant] = useState<string>(
    SortingVariants.NAME_ASC
  );
  const [searchText, setSearchText] = useState<string>('');

  const currentCategory = props.basicCategories.find(
    (category) => category.key === currentCategoryKey
  );
  const currentCategoryId = currentCategory?.id;
  const currentCategoryName = currentCategory?.name[Languages.ENGLISH];

  const childCategories = props.subCategories.filter(
    (subCategory) => subCategory.parent?.id === currentCategory?.id
  );

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
    setProductLoading(true);
    const fetchData = async () => {
      try {
        const response = await getFilteredItems(
          currentCategoryId,
          sortingVariant,
          searchText,
          chosenFilter
        );
        const filteredProducts = response.body.results;
        setFilteredProducts(filteredProducts);
        setProductLoading(false);
      } catch (error) {
        // TODO
        // handle error
      }
    };
    fetchData();
  }, [getFilteredItems, chosenFilter, sortingVariant, searchText]);

  if (!currentCategory) {
    return <NotFoundPage />;
  }
  if (props.basicCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar
            childCategories={childCategories}
            filters={filters}
            setFilters={setChosenFilter}
          />
          {isProductLoading ? (
            <TailSpin wrapperClass="loader-spinner" />
          ) : (
            <Cards
              products={filteredProducts}
              sortingVariants={sortingVariant}
              setSortingVariants={setSortingVariant}
              setSearchText={setSearchText}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <TailSpin wrapperClass="loader-spinner" />;
  }
};

export default BasicCategory;
