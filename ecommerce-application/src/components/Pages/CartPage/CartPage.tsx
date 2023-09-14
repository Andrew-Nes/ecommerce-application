import { FC, useEffect, useState } from 'react';
import {
  CartUpdateFunction,
  CreateCart,
  GetActiveCart,
  // GetCart,
  // GetCustomer,
  RemoveCart,
} from '../../../api/apiFunctions';
import {
  Cart,
  CartUpdateAction,
  //LineItem,
  // MyCartDraft,
} from '@commercetools/platform-sdk';
import CartItem from './CartItem/CartItem';
import './CartPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyModal from '../../Modal/MyModal';

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
  const cartId = window.localStorage.getItem('cart') || '';
  async function setCart() {
    try {
      // const cartId = window.localStorage.getItem('cart') || '';
      const cart = await GetActiveCart();

      setCartItems(cart.body);
      setTotalPrice(cart.body.totalPrice.centAmount);
      console.log(`Active cart ${cart.body}`);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  const removeCart = async () => {
    try {
      await RemoveCart(cartId);
      const newCart = await CreateCart();
      const newCartId = newCart.body.id;
      window.localStorage.setItem('cart', newCartId);
      setIsUpdateData(true);
    } catch (error) {
      console.log(error);
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
