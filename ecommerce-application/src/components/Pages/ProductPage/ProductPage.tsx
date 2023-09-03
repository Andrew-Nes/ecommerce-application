import { FC, useEffect, useState } from 'react';
import { getProduct } from '../../../api/apiFunctions';
import Slider from '../../Slider/Slider';
import './productPage.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import Languages from '../../../types/commonDataTypes';
const noImagePic = '../../../../assets/img/slider-no-image.jpg';

const ProductPage: FC<{ id: string }> = (props) => {
  const [product, setProduct] = useState<ProductProjection>();
  useEffect(() => {
    const currentProduct = async () => {
      const prod = await getProduct(props.id);
      setProduct(prod.body);
    };
    currentProduct();
  }, [setProduct, props.id]);
  return (
    <div className="product-page">
      <div className="product-page__wrapper">
        <div className="product-page__container">
          <div className="product-page__slider-container">
            {!product ? (
              <div className="product-page__slider">
                <img src={noImagePic} alt="no image" />
              </div>
            ) : (
              <Slider sliderImages={product?.masterVariant.images} />
            )}
          </div>
          <div className="product-page__info">
            <h3 className="product-page__name">
              {product?.name[Languages.ENGLISH]}
            </h3>
            {product?.masterVariant.prices &&
            product?.masterVariant.prices[0].discounted ? (
              <div className="product-page__prices">
                <div className="product-page__full-price">
                  {product?.masterVariant.prices[0].value.centAmount / 100} USD
                </div>
                <div className="product-page__discounted-price">
                  {product?.masterVariant.prices[0].discounted.value
                    .centAmount / 100}{' '}
                  USD
                </div>
              </div>
            ) : product?.masterVariant.prices ? (
              <div className="product-page__prices">
                <div className="product-page__full-price actual">
                  {product?.masterVariant.prices[0].value.centAmount / 100} USD
                </div>
              </div>
            ) : (
              <div className="product-page__prices"> Out of stock </div>
            )}
            <ul className="product-page__attributes">
              {product?.masterVariant.attributes
                ? product?.masterVariant.attributes.map((el) => {
                    return (
                      <li
                        className="product-page__attributes-item"
                        key={product?.masterVariant.attributes?.indexOf(el)}
                      >
                        <span className="product-page__attributes-name">
                          {el.name}:{' '}
                        </span>
                        <span className="product-page__attributes-value">
                          {el.value}
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
        {
          <div className="product-page__description">
            {!product || !product.description
              ? 'No description for this product'
              : product.description[Languages.ENGLISH].split('.').map((el) => {
                  return (
                    <p
                      className="product-page__description__paragraph"
                      key={el.length}
                    >
                      {el}.
                    </p>
                  );
                })}
          </div>
        }
      </div>
    </div>
  );
};

export default ProductPage;
