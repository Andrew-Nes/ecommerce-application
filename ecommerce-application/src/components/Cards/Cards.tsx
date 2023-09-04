import { ProductProjection } from '@commercetools/platform-sdk';
import { Dispatch, FC, SetStateAction } from 'react';
import SortForm from '../Forms/SortForm/SortForm';
import { Languages } from '../../types/commonDataTypes';
import NonExistentProducts from '../Catalog/NonExistingProducts.tsx/NonExistentProducts';
import SearchForm from '../Forms/SearchForm/SearchForm';

import { routes } from '../../types/routingTypes';
import { useNavigate } from 'react-router-dom';

interface cardsProps {
  products: ProductProjection[];
  sortingVariants: string;
  setSortingVariants: Dispatch<SetStateAction<string>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  setProductId: Dispatch<SetStateAction<string>>;
}

const Cards: FC<cardsProps> = (props: cardsProps) => {
  const redirect = useNavigate();
  return (
    <div className="cards__wrapper">
      <div className="cards__header">
        <p className="text">{`${props.products.length} Results`}</p>
        <div>
          <SearchForm setSearchText={props.setSearchText} />
          {/* <label>
            <input type='text' />
            </label>
          <button onClick={() => props.setSearchText('dog')}>Search</button> */}
        </div>
        <SortForm
          setSorting={props.setSortingVariants}
          sortString={props.sortingVariants}
        />
      </div>
      <div className="cards">
        {props.products.length > 0 ? (
          props.products.map((product) => {
            const image: string = product.masterVariant.images?.[0]?.url || '';
            return (
              <div
                className="card"
                key={product.id}
                onClick={() => {
                  props.setProductId(product.id);
                  redirect(routes.PRODUCT);
                }}
              >
                <img className="card__image" src={image} />
                <h3 className="card__heading">
                  {product.name[Languages.ENGLISH]}
                </h3>
                <p className="card__description text">
                  {product.description
                    ? `${product.description[Languages.ENGLISH].slice(
                        0,
                        60
                      )}...`
                    : ''}
                </p>
                <div className="prices__wrapper">
                  <p className="card__price card__price_current text">
                    {product.masterVariant.price?.discounted
                      ? `$${
                          product.masterVariant.price.discounted.value
                            .centAmount / 100
                        }`
                      : `$${
                          product.masterVariant.price
                            ? product.masterVariant.price.value.centAmount / 100
                            : ''
                        }`}
                  </p>
                  {product.masterVariant.price?.discounted && (
                    <p className="card__price text">
                      {`$${product.masterVariant.price.value.centAmount / 100}`}
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
  );
};

export default Cards;
