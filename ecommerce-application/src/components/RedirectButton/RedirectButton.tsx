import { useNavigate } from 'react-router-dom';
import { FC, MouseEventHandler } from 'react';
import { buttonProps } from '../../types/routingTypes';

const RedirectButton: FC<buttonProps> = ({ text, route, className }) => {
  const redirect = useNavigate();
  const redirection: MouseEventHandler = () => {
    redirect(route);
  };
  return (
    <button className={className} onClick={redirection}>
      {text}
    </button>
  );
};

export default RedirectButton;
