import {
  ClientResponse,
  ErrorResponse,
  LineItem,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import './CartItem.scss';
import { CartUpdateFunction } from '../../../../api/apiFunctions';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useCartContext } from '../../../../utils/cartContext';
import { serviceErrors } from '../../../../types/formTypes';
import { reloadPage } from '../../../../utils/apiHelpers';
import { routes } from '../../../../types/routingTypes';
import { useNavigate } from 'react-router-dom';

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
  const { updateCartContextValue } = useCartContext();
  const redirect = useNavigate();


  const changeProductQuantity = async (quantity: number) => {
    setLoad(true);
    const updateAction: MyCartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId: props.cartItem.id,
      quantity: quantity,
    };
    try {
      const response = await CartUpdateFunction(updateAction);
      const items = response.body.lineItems.reduce(
        (acc, el) => acc + el.quantity,
        0
      );
      props.isUpdateData(true);
      updateCartContextValue(items);
    } catch (error) {
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;
      const errorCode = errorResponse.body.statusCode;
      if (errorCode === serviceErrors.INVALID_TOKEN) {
        reloadPage();
      } else {
        redirect(routes.NOTFOUND);
      }
    } finally {
      setLoad(false);
    }
  };

  const removeProduct = async () => {
    await changeProductQuantity(0)
  };
  
  const addProductQuantity = async () => {
    await changeProductQuantity(itemCount + 1)
  };

  const removedProductQuantity = async () => {
    await changeProductQuantity(itemCount - 1)
  };

  return (
    <div key={props.index} className="cart-item__container">
      <button className="cart_button" onClick={removeProduct}>
        Remove from Cart
      </button>
      <h3>{itemName}</h3>

      <img src={itemImage} alt="image" width={'100%'} />

      <div className="price__container">
        <strong className="cart-item_price">Price:</strong>
        {props.cartItem.price.discounted ? (
          <div className="cart-item-price__container">
            <span className="cart-item_price">
              {props.cartItem.price.discounted.value.centAmount / 100} $
            </span>
            <span className="cart-item_price none-active">{itemPrice} $</span>
          </div>
        ) : (
          <strong className="cart-item_price">{itemPrice} $</strong>
        )}
      </div>

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
      <strong className="cart-item_price">
        Total price:{' '}
        {props.cartItem.price.discounted
          ? (props.cartItem.price.discounted.value.centAmount / 100) * itemCount
          : itemPrice * itemCount}{' '}
        $
      </strong>
    </div>
  );
};

export default CartItem;
