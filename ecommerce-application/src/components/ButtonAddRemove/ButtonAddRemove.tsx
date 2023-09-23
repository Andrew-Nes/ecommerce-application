import { FC, useEffect, useState } from 'react';
import {
  AddProductToCart,
  CartUpdateFunction,
  GetActiveCart,
} from '../../api/apiFunctions';
import {
  CartUpdateAction,
  ClientResponse,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import './buttonAddRemove.scss';
import { useCartContext } from '../../utils/cartContext';
import { serviceErrors } from '../../types/formTypes';
import { reloadPage } from '../../utils/apiHelpers';
import { routes } from '../../types/routingTypes';
import { useNavigate } from 'react-router-dom';
import { buttonsText } from '../../types/elementsText';
import { TailSpin } from 'react-loader-spinner';

interface buttonAddRemoveProps {
  id: string;
}

const ButtonAddRemove: FC<buttonAddRemoveProps> = (props) => {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const { cartContextValue, updateCartContextValue } = useCartContext();
  const [isInCart, setIsInCart] = useState(false);
  const redirect = useNavigate();

  const addProduct = async () => {
    setIsAddingToCart(true);
    try {
      await AddProductToCart(props.id);
      setIsInCart(true);
      updateCartContextValue(cartContextValue + 1);
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
      setIsAddingToCart(false);
    }
  };

  const removeProduct = async () => {
    setIsAddingToCart(true);
    try {
      const response = await GetActiveCart();
      const lineItemId = response.body.lineItems.find(
        (el) => el.productId === props.id
      )?.id;

      const removeAction: CartUpdateAction = {
        action: 'changeLineItemQuantity',
        lineItemId: lineItemId,
        quantity: 0,
      };
      await CartUpdateFunction(removeAction);
      setIsInCart(false);
      updateCartContextValue(cartContextValue - 1);
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
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetActiveCart();
      if (response.body.lineItems.find((el) => el.productId === props.id)) {
        setIsInCart(true);
        const items = response.body.lineItems.reduce(
          (acc, el) => acc + el.quantity,
          0
        );
        updateCartContextValue(items);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart-button-container">
      {isInCart ? (
        isAddingToCart ? (
          <TailSpin wrapperClass="loader-spinner loader-spinner_small cart-button add button" />
        ) : (
          <button className="cart-button add button" onClick={removeProduct}>
            {buttonsText.REMOVE_FROM_CART}
          </button>
        )
      ) : isAddingToCart ? (
        <TailSpin wrapperClass="loader-spinner loader-spinner_small cart-button add button" />
      ) : (
        <button className="cart-button add button" onClick={addProduct}>
          {buttonsText.ADD_TO_CART}
        </button>
      )}
    </div>
  );
};

export default ButtonAddRemove;
