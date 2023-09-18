import { LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import './CartItem.scss';
import { CartUpdateFunction } from '../../../../api/apiFunctions';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useCartContext } from '../../../../utils/cartContext';

interface CartItemProps {
  cartItem: LineItem;
  index: number;
  key: number;
  isUpdateData: Dispatch<SetStateAction<boolean>>;
}

const CartItem: FC<CartItemProps> = (props: CartItemProps) => {
  const [isLoad, setLoad] = useState(false);
  const itemName = Object.values(props.cartItem.name)[0];
  const itemImage = props.cartItem.variant.images?.[0].url;
  const itemPrice = props.cartItem.price.value.centAmount / 100;
  const itemCount = props.cartItem.quantity;
  const { cartContextValue, updateCartContextValue } = useCartContext();

  const removeProduct = async () => {
    try {
      setLoad(true);
      const updateAction: MyCartUpdateAction = {
        action: 'changeLineItemQuantity',
        lineItemId: props.cartItem.id,
        quantity: 0,
      };
      await CartUpdateFunction(updateAction);
      props.isUpdateData(true);
      updateCartContextValue(cartContextValue - 1);
    } catch {
      throw new Error('changeLineItemQuantity');
    } finally {
      setLoad(false);
    }
  };
  const addProductQuantity = async () => {
    setLoad(true);
    const updateAction: MyCartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: props.cartItem.id,
      quantity: itemCount + 1,
    };
    try {
      await CartUpdateFunction(updateAction);
      props.isUpdateData(true);
    } catch {
      throw new Error('changeLineItemQuantity');
    } finally {
      setLoad(false);
    }
  };

  const removedProductQuantity = async () => {
    setLoad(true);
    const updateAction: MyCartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: props.cartItem.id,
      quantity: itemCount - 1,
    };
    try {
      await CartUpdateFunction(updateAction);
      props.isUpdateData(true);
    } catch {
      throw new Error('changeLineItemQuantity');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div key={props.index} className="cart-item__container">
      <button className="cart_button" onClick={removeProduct}>
        Remove from Cart
      </button>
      <h3>{itemName}</h3>

      <img src={itemImage} alt="image" width={'100%'} />
      <strong className="cart-item_price">Price: {itemPrice} $</strong>
      <div className="count-buttons__container">
        <strong className="cart-item_price">Quantity:</strong>
        <button
          className="count-button"
          onClick={removedProductQuantity}
          disabled={itemCount < 2 || isLoad}
        >
          -
        </button>
        <span className="count-element">{itemCount}</span>
        <button
          className="count-button"
          onClick={addProductQuantity}
          disabled={isLoad}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
