import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/main-page';
import LoginPage from './pages/loginPage/login-page';
import RegistrationPage from './pages/registrationPage/registration-page';
import NotFoundPage from './pages/notFoundPage/not-found-page';
import Header from './header/header';
import { ToastContainer } from 'react-toastify';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { createContext, useEffect, useState } from 'react';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import { getCategories } from '../api/apiFunctions';
// import { categoriesObj } from '../utils/data/categories';
import { Category } from '@commercetools/platform-sdk';


export const LogInContext = createContext(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isLoggedIn') === 'true' || false
  );
  const [categories, setCategories] = useState<Category[]>([]);

  function logInStateChange(newValue: boolean): void {
    setIsLoggedIn(newValue);
    window.localStorage.setItem('isLoggedIn', newValue.toString());
  }
  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      const results = categories.body.results;
      setCategories(results);
    };
    fetchData();
  }, [getCategories]);

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
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="catalog"
            element={<CatalogPage categories={categories} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
}

export default App;
