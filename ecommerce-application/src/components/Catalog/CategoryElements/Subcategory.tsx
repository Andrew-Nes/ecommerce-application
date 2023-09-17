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
import { Filters, filtersCheckboxes } from '../../../types/categoryTypes';
import createFilterObject from '../../../utils/filterCreation';
import { SortingVariants, serviceErrors } from '../../../types/formTypes';
import Cards from '../../Cards/Cards';
import NotFoundPage from '../../Pages/NotFoundPage/NotFoundPage';
import { reloadPage } from '../../../utils/apiHelpers';
import Pagination from '../../Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';

interface SubcategoryProps {
  mainCategories: Category[];
  subCategories: Category[];
  setProductId: Dispatch<SetStateAction<string>>;
}

const Subcategory: FC<SubcategoryProps> = (props: SubcategoryProps) => {
  const { currentSubCategoryKey } = useParams();
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [productsPerPage, setProductsPerPage] = useState<number>(0);

  const [filteredProducts, setFilteredProducts] = useState<ProductProjection[]>(
    []
  );
  const [isNewCategory, changeIsNewCategory] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters[]>([]);
  const [isProductLoading, setProductLoading] = useState<boolean>(true);
  const [chosenFilter, setChosenFilter] = useState<filtersCheckboxes>({});
  const [sortingVariant, setSortingVariant] = useState<string>(
    SortingVariants.NAME_ASC
  );
  const [searchText, setSearchText] = useState<string>('');

  const { firstContentIndex, nextPage, prevPage, page, setPage, totalPages } =
    usePagination({
      contentPerPage: productsPerPage,
      count: totalProducts,
    });

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
    setProductLoading(true);
    changeIsNewCategory(true);

    const fetchData = async () => {
      try {
        const response = await getItems(currentCategoryId, sortingVariant);
        const products = response.body.results;
        setAllProducts(products);
        setTotalProducts(response.body.total || response.body.count);
      } catch (error) {
        const errorResponse = JSON.parse(
          JSON.stringify(error)
        ) as ClientResponse<ErrorResponse>;
        const errorCode = errorResponse.body.statusCode;
        if (errorCode === serviceErrors.INVALID_TOKEN) {
          reloadPage();
        } else {
          redirect(routes.NOTFOUND);
        }
      } finally {
        setProductLoading(false);
        changeIsNewCategory(false);
      }
    };
    fetchData();
  }, [getItems, currentCategory]);

  useEffect(() => {
    setProductLoading(true);

    const fetchData = async () => {
      try {
        const response = await getFilteredItems(
          currentCategoryId,
          sortingVariant,
          searchText,
          firstContentIndex >= 0 ? firstContentIndex : 0,
          chosenFilter
        );
        const filteredProducts = response.body.results;
        setFilteredProducts(filteredProducts);
        setTotalProducts(response.body.total || response.body.count);
        setProductsPerPage(response.body.limit);
      } catch (error) {
        const errorResponse = JSON.parse(
          JSON.stringify(error)
        ) as ClientResponse<ErrorResponse>;
        const errorCode = errorResponse.body.statusCode;
        if (errorCode === serviceErrors.INVALID_TOKEN) {
          reloadPage();
        } else {
          redirect(routes.NOTFOUND);
        }
      } finally {
        setProductLoading(false);
      }
    };
    fetchData();
  }, [chosenFilter, sortingVariant, searchText, firstContentIndex]);

  useEffect(() => {
    setFilters(createFilterObject(allProducts));
    setChosenFilter({});
  }, [allProducts]);

  useEffect(() => {
    setPage(1);
  }, [chosenFilter, searchText]);

  if (!currentCategory) {
    return <NotFoundPage />;
  }
  if (props.subCategories.length > 0) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        <div className="catalog__content">
          <Sidebar
            filters={filters}
            setFilters={setChosenFilter}
            isNew={isNewCategory}
          />
          {isProductLoading ? (
            <TailSpin wrapperClass="loader-spinner" />
          ) : (
            <div className="products__wrapper">
              <Cards
                products={filteredProducts}
                sortingVariants={sortingVariant}
                setSortingVariants={setSortingVariant}
                searchText={searchText}
                setSearchText={setSearchText}
                setProductId={props.setProductId}
                productNumber={totalProducts}
              />
              {filteredProducts.length > 0 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setPage={setPage}
                />
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
