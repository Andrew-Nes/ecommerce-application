import { FC } from 'react';

type BurgerButtonProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const BurgerButton: FC<BurgerButtonProps> = (props) => {
  return (
    <button
      className={`burger__button ${props.open ? 'burger__button_open' : ''}`}
      onClick={() => props.setOpen(!props.open)}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default BurgerButton;
