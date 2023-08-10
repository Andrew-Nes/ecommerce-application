import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import LoginForm from './components/forms/loginForm/loginForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>
);
