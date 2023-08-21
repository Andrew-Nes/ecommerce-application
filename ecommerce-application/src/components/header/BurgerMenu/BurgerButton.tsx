type BurgerButtonProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function BurgerButton(props: BurgerButtonProps) {
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
}
