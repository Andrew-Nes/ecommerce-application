import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { buttonProps } from '../../types/routes';

function RedirectButton({ text, route, className }: buttonProps) {
  const redirect = useNavigate();
  const redirection: MouseEventHandler = () => {
    redirect(route);
  };
  return (
    <button className={className} onClick={redirection}>
      {text}
    </button>
  );
}

export default RedirectButton;
