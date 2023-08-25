import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/main-page';
import LoginPage from './pages/loginPage/login-page';
import RegistrationPage from './pages/registrationPage/registration-page';
import NotFoundPage from './pages/notFoundPage/not-found-page';
import Header from './header/header';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import CatalogPage from './pages/catalogPage/catalog-page';
import { getCategories } from '../api/apiFunctions';
import { categoriesObj } from '../utils/data/categories';

export const LogInContext = createContext(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isLoggedIn') === 'true' || false
  );
  function logInStateChange(newValue: boolean): void {
    setIsLoggedIn(newValue);
    window.localStorage.setItem('isLoggedIn', newValue.toString());
  }
  useEffect(() => {
    getCategories().then(({ body }) => {
      const results = body.results;
      results.forEach((result) =>
        categoriesObj.setCategory(result.key, result.name, result.id)
      );
    });
  });
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
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
}

export default App;
