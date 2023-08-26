import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { FC, createContext, useState } from 'react';

export const LogInContext = createContext(false);

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isLoggedIn') === 'true' || false
  );
  const logInStateChange = (newValue: boolean): void => {
    setIsLoggedIn(newValue);
    window.localStorage.setItem('isLoggedIn', newValue.toString());
  };

  return (
    <LogInContext.Provider value={isLoggedIn}>
      <BrowserRouter>
        <Header loginStateChange={logInStateChange} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="login"
            element={<LoginPage loginStateChange={logInStateChange} />}
          />
          <Route
            path="register"
            element={<RegistrationPage loginStateChange={logInStateChange} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
};

export default App;
