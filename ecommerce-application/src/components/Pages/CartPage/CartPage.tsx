import { FC, useEffect, useState } from 'react';
import {
  CartUpdateFunction,
  CreateCart,
  GetCart,
  // GetCart,
  // GetCustomer,
  RemoveCart,
} from '../../../api/apiFunctions';
import {
  Cart,
  CartUpdateAction,
  ClientResponse,
  ErrorResponse,
  //LineItem,
  // MyCartDraft,
} from '@commercetools/platform-sdk';
import CartItem from './CartItem/CartItem';
import './CartPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyModal from '../../Modal/MyModal';
import { toast } from 'react-toastify';
import { errorsMessage } from '../../../types/formTypes';

interface CartPageProp {
  loginStateChange: (newValue: boolean) => void;
}

type PromoFormData = {
  promo: string;
};

const CartPage: FC<CartPageProp> = () => {
  const [cartItems, setCartItems] = useState<Cart | undefined>();
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>();
  const cartId = window.localStorage.getItem('cartId') || '';
  async function setCart() {
    const cartId = window.localStorage.getItem('cartId') || '';
    try {
      const cart = await GetCart(cartId);

      setCartItems(cart.body);
      setTotalPrice(cart.body.totalPrice.centAmount);
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
    const updateAction: CartUpdateAction = {
      action: 'addDiscountCode',
      code: data.promo,
    };
    try {
      await CartUpdateFunction(cartId, updateAction);
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
      // throw new Error('addDiscountCode');
    }
  };

  const removeCart = async () => {
    try {
      const cartId = window.localStorage.getItem('cartId') || '';
      await RemoveCart(cartId);
      const newCart = await CreateCart();
      const newCartId = newCart.body.id;
      window.localStorage.setItem('cartId', newCartId);
      setIsUpdateData(true);
      setModalActive(false);
    } catch (error) {
      throw new Error('removeCart');
    }
  };

  return (
    <div className="cart-page__wrapper">
      <button onClick={() => setModalActive(true)}>Remove Cart</button>
      <MyModal active={isModalActive} setActive={setModalActive}>
        <p>Delete current cart?</p>
        <button onClick={removeCart}>ОК</button>
        <button onClick={() => setModalActive(false)}>Back</button>
      </MyModal>
      <h2>Cart page</h2>
      <div>
        <strong>Total price: </strong> <span>{totalPrice}</span>
      </div>
      <div>
        <h3>Promo code:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('promo')} />
          <button type="submit">Apply</button>
        </form>
      </div>
      {cartItems
        ? cartItems.lineItems.map((item, index) => {
            return (
              <CartItem
                cartItem={item}
                index={index}
                key={index}
                isUpdateData={setIsUpdateData}
              />
            );
          })
        : 'Cart is Empty'}
    </div>
  );
};

export default CartPage;
