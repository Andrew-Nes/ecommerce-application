import './profile-page.scss';
import { routes } from '../../../types/routingTypes';
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogInContext } from '../../app';

export default function ProfilePage() {
  const isLoggedIn = useContext(LogInContext);
  const path = useLocation();
  const redirect = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      redirect(routes.LOGIN);
    }
  }, [isLoggedIn, path, redirect]);
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
}
