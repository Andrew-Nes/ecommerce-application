import { CartUpdateAction, LineItem } from '@commercetools/platform-sdk';
import './CartItem.scss';
import { CartUpdateFunction } from '../../../../api/apiFunctions';
import { Dispatch, FC, SetStateAction } from 'react';
interface CartItemProps {
  cartItem: LineItem;
  index: number;
  key: number;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
}

const CartItem: FC<CartItemProps> = (props: CartItemProps) => {
  const itemName = Object.values(props.cartItem.name)[0];
  const itemImage = props.cartItem.variant.images?.[0].url;
  const itemPrice = props.cartItem.price.value.centAmount;
  const itemCount = props.cartItem.quantity;

  const removeProduct = async () => {
    const cartId = window.localStorage.getItem('cartId') || '';

    try {
      const updateAction: CartUpdateAction = {
        action: 'changeLineItemQuantity',
        lineItemId: props.cartItem.id,
        quantity: 0,
      };
      await CartUpdateFunction(cartId, updateAction);
      props.isUpdateData(true);
    } catch {
      throw new Error('changeLineItemQuantity');
    }
  };
  const addProductQuantity = async () => {
    const cartId = window.localStorage.getItem('cartId') || '';
    const updateAction: CartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: props.cartItem.id,
      quantity: itemCount + 1,
    };
    try {
      await CartUpdateFunction(cartId, updateAction);
      props.isUpdateData(true);
    } catch {
      throw new Error('changeLineItemQuantity');

    }
  };

  const removedProductQuantity = async () => {
    const cartId = window.localStorage.getItem('cartId') || '';
    const updateAction: CartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: props.cartItem.id,
      quantity: itemCount - 1,
    };
    try {
      await CartUpdateFunction(cartId, updateAction);
      props.isUpdateData(true);
    } catch {
      throw new Error('changeLineItemQuantity');
    }
  };

  return (
    <div key={props.index} className="cart-item__container">
      <h3>{itemName}</h3>
      <img src={itemImage} alt="image" width={'100%'} />
      <p>Price: {itemPrice}</p>
      <div className="count-buttons__container">
        <button
          className="count-button"
          onClick={removedProductQuantity}
          disabled={itemCount < 2}
        >
          -
        </button>
        <span className="count-element">{itemCount}</span>
        <button className="count-button" onClick={addProductQuantity}>
          +
        </button>
      </div>
      <button className="remove-button" onClick={removeProduct}>
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;
