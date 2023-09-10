import { FC } from 'react';
import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import {
  CreateCart,
  GetCart,
  AddProductToCart,
} from '../../../api/apiFunctions';

interface BasketButtonProps {
  product: ProductProjection;
}

const BasketButton: FC<BasketButtonProps> = (props) => {
  const addProduct = async () => {
    const myCart: MyCartDraft = {
      currency: 'USD',
    };
    try {
      // if (!window.localStorage.getItem('cart')) {
      // const cart =  await CreateCart(myCart)
      // }
      const cartId = 'abfa453d-509b-403f-ad53-93668e8d2c1e';
      const productId = props.product.id;
      await AddProductToCart(cartId, productId);
    } catch (error) {
      console.log(error);
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
