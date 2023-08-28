import { FC, useEffect, useState } from 'react';
import { getProduct } from '../../../api/apiFunctions';
import Slider from '../../Slider/Slider';
import './productPage.scss';
import { ProductProjection } from '@commercetools/platform-sdk';

const ProductPage: FC = () => {
  const [product, setProduct] = useState<ProductProjection>();
  useEffect(() => {
    const currentProduct = async () => {
      const prod = await getProduct('218b0d8d-9685-4fa7-8aef-574d731667af');
      setProduct(prod.body);
    };
    currentProduct();
  }, [setProduct]);
  return (
    <div>
      {!product ? (
        <div className="slider">No images for this product</div>
      ) : (
        <Slider sliderImages={product?.masterVariant.images} />
      )}
    </div>
  );
};

export default ProductPage;
