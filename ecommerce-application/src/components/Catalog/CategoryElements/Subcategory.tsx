import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from '../../../types/breadcrumbsTypes';
import { routes } from '../../../types/routingTypes';
import { anchorsText } from '../../../types/elementsText';
import BreadcrumbsList from '../../BreadcrumbsList';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { FC, useEffect, useState } from 'react';
import { getItems } from '../../../api/apiFunctions';
import { TailSpin } from 'react-loader-spinner';
// import NonExistentCategory from './NonExistentCategory';

interface SubcategoryProps {
  categories: Category[];
}

const Subcategory: FC<SubcategoryProps> = (props: SubcategoryProps) => {
  const { subcategoryKey } = useParams();
  const redirect = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [isLoading, setState] = useState<boolean>(true);

  const category = props.categories.find(
    (category) => category.key === subcategoryKey
  );
  const parentId = category?.parent?.id;
  const parentCategory = props.categories.find(
    (category) => category.id === parentId
  );
  const parentCategoryName = parentCategory?.name[Languages.ENGLISH];
  const parentCategoryKey = parentCategory?.key;
  console.log(parentCategoryKey);
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
      key: `${parentCategoryKey}`,
      route: `..`,
      name: `${parentCategoryName}`,
    },
    {
      key: `${subcategoryKey}`,
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
  }, [getItems, props, category]);

  if (props.categories.length > 0) {
    // if (category) {
    return (
      <div className="wrapper catalog-page__wrapper">
        <BreadcrumbsList items={lists} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="catalog_content">
            <div className="sidebar">
              {/* <div className='sidebar__title'></div> */}
              <div className="sidebar__content">
                <ul className="list">
                  {props.categories
                    .filter((cat) => cat.parent?.id === category?.id)
                    .map((cat) => (
                      <li key={cat.key} className="list__item">
                        <Link
                          className="list__link"
                          to={`${cat.slug[Languages.ENGLISH]}`}
                        >
                          {cat.name[Languages.ENGLISH]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
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

export default Subcategory;
