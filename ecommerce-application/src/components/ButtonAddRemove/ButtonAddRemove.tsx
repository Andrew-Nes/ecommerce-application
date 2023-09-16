import { FC, useEffect, useState } from 'react';
import {
  AddProductToCart,
  CartUpdateFunction,
  GetCart,
} from '../../api/apiFunctions';
import { CartUpdateAction } from '@commercetools/platform-sdk';
import './buttonAddRemove.scss';

const ButtonAddRemove: FC<{ id: string }> = (props) => {
  const cartId: string = localStorage.getItem('cartId') || '';
  const [isInCart, setIsInCart] = useState(false);

  const addProduct = async () => {
    await AddProductToCart(cartId, props.id);
    setIsInCart(true);
  };

  const removeProduct = async () => {
    let lineItemId;
    await GetCart(cartId).then((resp) => {
      lineItemId = resp.body.lineItems.find((el) => el.productId === props.id)
        ?.id;
    });
    const removeAction: CartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: lineItemId,
      quantity: 0,
    };
    CartUpdateFunction(cartId, removeAction);
    setIsInCart(false);
  };

  useEffect(() => {
    GetCart(cartId).then((resp) => {
      if (resp.body.lineItems.find((el) => el.productId === props.id)) {
        setIsInCart(true);
      }
    });
  }, [setIsInCart, cartId, props.id]);

  return (
    <div className="cart-button-container">
      {isInCart ? (
        <button className="cart-button remove" onClick={removeProduct}>
          REMOVE FROM CART
        </button>
      ) : (
        <button className="cart-button add" onClick={addProduct}>
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default ButtonAddRemove;
