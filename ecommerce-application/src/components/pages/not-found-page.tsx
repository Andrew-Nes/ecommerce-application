import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.scss';

function NotFoundPage() {
  const redirect = useNavigate();
  const clickHandler: MouseEventHandler = () => {
    redirect('/');
  };
  return (
    <div className="not-found-page">
      <h2>something went wrong...</h2>
      <button onClick={clickHandler}>Click to return to main</button>
    </div>
  );
}

export default NotFoundPage;
