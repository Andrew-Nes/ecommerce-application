import { FC, useEffect, useState } from 'react';
import {
  CartUpdateFunction,
  CreateCart,
  GetActiveCart,
  RemoveCart,
} from '../../../api/apiFunctions';
import {
  Cart,
  ClientResponse,
  ErrorResponse,
  LineItem,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import CartItem from './CartItem/CartItem';
import './CartPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyModal from '../../Modal/MyModal';
import { toast } from 'react-toastify';
import { errorsMessage } from '../../../types/formTypes';
import { Link } from 'react-router-dom';
import { anchorsText } from '../../../types/elementsText';
import { routes } from '../../../types/routingTypes';

interface CartPageProp {
  loginStateChange: (newValue: boolean) => void;
}

type PromoFormData = {
  promo: string;
};

const getLineItemsPrice = (lineItems: LineItem[]) => {
  const totalPrice = lineItems.reduce((acc, cur) => {
    return acc + cur.price.value.centAmount * cur.quantity;
  }, 0);
  return totalPrice;
};

const CartPage: FC<CartPageProp> = () => {
  const [isLoad, setLoad] = useState(false);
  const [cartItems, setCartItems] = useState<Cart | undefined>();
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>();

  async function setCart() {
    try {
      const cart = await GetActiveCart();
      const cartDiscountPrice = getLineItemsPrice(cart.body.lineItems) / 100;
      setCartItems(cart.body);
      setTotalPrice(cartDiscountPrice);
      setTotalDiscountPrice(cart.body.totalPrice.centAmount / 100);
    } catch {
      throw new Error('setCart');
    }
  }

  useEffect(() => {
    setCart();
    if (isUpdateData) {
      setIsUpdateData(false);
    }
  }, [isUpdateData]);

  const { register, handleSubmit, reset } = useForm<PromoFormData>({
    mode: 'all',
  });
  const onSubmit: SubmitHandler<PromoFormData> = async (data) => {
    setLoad(true);
    const updateAction: MyCartUpdateAction = {
      action: 'addDiscountCode',
      code: data.promo,
    };
    try {
      await CartUpdateFunction(updateAction);
      setIsUpdateData(true);
      reset();
    } catch (error) {
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;
      const errorCode = errorResponse.body.statusCode;
      if (errorCode === 400) {
        toast.error(errorsMessage.NOT_FOUND_DISCOUNT_CODE, {
          position: 'bottom-center',
        });
      }
    } finally {
      setLoad(false);
    }
  };

  const removeCart = async () => {
    setLoad(true);
    try {
      await RemoveCart();
      const newCart = await CreateCart();
      const newCartId = newCart.body.id;
      window.localStorage.setItem('cartId', newCartId);
      setIsUpdateData(true);
      setModalActive(false);
    } catch (error) {
      throw new Error('removeCart');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="cart-page__wrapper">
      <MyModal active={isModalActive} setActive={setModalActive}>
        <div className="delete-cart-modal">
          <h3>Delete current cart?</h3>
          <div className="delete-cart-button__container">
            <button
              className="cart_button"
              onClick={removeCart}
              disabled={isLoad}
            >
              ОК
            </button>
            <button
              className="cart_button"
              onClick={() => setModalActive(false)}
            >
              Back
            </button>
          </div>
        </div>
      </MyModal>
      <div className="cart-page__title-container">
        <h2>Cart page</h2>
        <button className="cart_button" onClick={() => setModalActive(true)}>
          Remove Cart
        </button>
      </div>

      <div className="total-price__container">
        <strong className="cart-total-price">Total price:</strong>
        {totalPrice !== totalDiscountPrice ? (
          <div className="discounted-price__container">
            <span className="total-discount-price">{totalDiscountPrice} $</span>
            <span className="total-price inactive">{totalPrice} $</span>
          </div>
        ) : (
          <span className="total-price">{totalPrice} $</span>
        )}
      </div>

      <div className="promo-code__container">
        <div className="promo-code__form">
          <h3>Promo code:</h3>
          <form className="promo-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('promo')} />
            <button className="cart_button" type="submit" disabled={isLoad}>
              Apply
            </button>
          </form>
        </div>
        <p className="promo-code_info">
          When using multiple promo codes, the code with the highest discount is
          applied
        </p>
      </div>
      <div className="cartItems-wrapper">
        {cartItems?.lineItems.length ? (
          cartItems.lineItems.map((item, index) => {
            return (
              <CartItem
                cartItem={item}
                index={index}
                key={index}
                isUpdateData={setIsUpdateData}
              />
            );
          })
        ) : (
          <div>
            <span className="empty-cart-text">
              The cart is empty, go to the catalog page to buy something!
            </span>
            <Link to={routes.CATALOG} className="login__anchor">
              <span className="link-to-cart-text">
                {anchorsText.TO_CATALOG}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
