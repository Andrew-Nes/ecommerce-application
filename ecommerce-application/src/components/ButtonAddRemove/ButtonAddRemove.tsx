import { FC, useEffect, useState } from 'react';
import {
  AddProductToCart,
  CartUpdateFunction,
  GetActiveCart,
} from '../../api/apiFunctions';
import { CartUpdateAction } from '@commercetools/platform-sdk';
import './buttonAddRemove.scss';
import { useCartContext } from '../../utils/cartContext';

interface buttonAddRemoveProps {
  id: string;
}

const ButtonAddRemove: FC<buttonAddRemoveProps> = (props) => {
  const { cartContextValue, updateCartContextValue } = useCartContext();
  const [isInCart, setIsInCart] = useState(false);

  const addProduct = async () => {
    await AddProductToCart(props.id);
    setIsInCart(true);
    updateCartContextValue(cartContextValue + 1);
  };

  const removeProduct = async () => {
    let lineItemId;
    await GetActiveCart().then((resp) => {
      lineItemId = resp.body.lineItems.find((el) => el.productId === props.id)
        ?.id;
    });

    const removeAction: CartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: lineItemId,
      quantity: 0,
    };
    CartUpdateFunction(removeAction);
    setIsInCart(false);
    updateCartContextValue(cartContextValue - 1);
  };

  useEffect(() => {
    GetActiveCart().then((resp) => {
      if (resp.body.lineItems.find((el) => el.productId === props.id)) {
        setIsInCart(true);
        updateCartContextValue(resp.body.lineItems.length);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
