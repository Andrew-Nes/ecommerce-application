import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import BreadcrumbsList from '../../Breadcrumbs/BreadcrumbsList';
import {
  Category,
  ClientResponse,
  ErrorResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { getFilteredItems, getItems } from '../../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';
import Sidebar from '../../Sidebar/Sidebar';
import { filtersCheckboxes } from '../../../types/categoryTypes';
import createFilterObject from '../../../utils/filterCreation';
import { SortingVariants, serviceErrors } from '../../../types/formTypes';
import Cards from '../../Cards/Cards';
import NotFoundPage from '../../Pages/NotFoundPage/NotFoundPage';

interface SubcategoryProps {
  mainCategories: Category[];
  subCategories: Category[];
  setProductId: Dispatch<SetStateAction<string>>;
}

const Subcategory: FC<SubcategoryProps> = (props: SubcategoryProps) => {
  const { currentSubCategoryKey } = useParams();
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
  const redirect = useNavigate();
  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (props.subCategories.length === 0) {
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
        const errorResponse = JSON.parse(
          JSON.stringify(error)
        ) as ClientResponse<ErrorResponse>;
        if (errorResponse.body.statusCode === serviceErrors.INVALID_TOKEN) {
          window.localStorage.clear();
          location.reload();
          // TODO
          // redirect to component
        } else {
          redirect(routes.NOTFOUND);
        }
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
        const errorResponse = JSON.parse(
          JSON.stringify(error)
        ) as ClientResponse<ErrorResponse>;
        if (errorResponse.body.statusCode === serviceErrors.INVALID_TOKEN) {
          window.localStorage.clear();
          location.reload();
          // TODO
          // redirect to component
        } else {
          redirect(routes.NOTFOUND);
        }
      }
    };
    fetchData();
  }, [getFilteredItems, chosenFilter, sortingVariant, searchText]);

  if (!currentCategory) {
    return <NotFoundPage />;
  }
  if (props.subCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar filters={filters} setFilters={setChosenFilter} />
          {isProductLoading ? (
            <TailSpin wrapperClass="loader-spinner" />
          ) : (
            <Cards
              products={filteredProducts}
              sortingVariants={sortingVariant}
              setSortingVariants={setSortingVariant}
              setSearchText={setSearchText}
              setProductId={props.setProductId}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <TailSpin wrapperClass="loader-spinner" />;
  }
};

export default Subcategory;
