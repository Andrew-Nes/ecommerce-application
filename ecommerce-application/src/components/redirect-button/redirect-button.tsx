import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { buttonProps } from '../../types/routes';

function RedirectButton({ text, route }: buttonProps) {
  const redirect = useNavigate();
  const redirection: MouseEventHandler = () => {
    redirect(route);
  };
  return (
    <button className="navigation__button" onClick={redirection}>
      {text}
    </button>
  );
}

export default RedirectButton;
