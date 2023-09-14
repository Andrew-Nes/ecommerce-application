import { FC } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { AddProductToCart } from '../../../api/apiFunctions';

interface BasketButtonProps {
  product: ProductProjection;
}

const BasketButton: FC<BasketButtonProps> = (props) => {
  const addProduct = async () => {
    try {
      const cartId = window.localStorage.getItem('cartId') || '';
      const productId = props.product.id;
      await AddProductToCart(cartId, productId);
    } catch {
      throw new Error('addProduct');
    }
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addProduct();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default BasketButton;
