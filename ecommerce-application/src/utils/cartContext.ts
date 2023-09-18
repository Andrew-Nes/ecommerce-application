import { useContext } from 'react';
import { CartContext } from '../components/App';

export interface CartContextProps {
  cartContextValue: number;
  updateCartContextValue: (newValue: number) => void;
}
export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'usecartContext must be used within a cartContext Provider'
    );
  }
  return context;
};
