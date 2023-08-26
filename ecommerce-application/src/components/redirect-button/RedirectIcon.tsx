import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { iconProps } from '../../types/routingTypes';

const RedirectIcon = ({ src, route, className, alt }: iconProps) => {
  const redirect = useNavigate();
  const redirection: MouseEventHandler = () => {
    redirect(route);
  };
  return (
    <div className={className} onClick={redirection}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default RedirectIcon;
