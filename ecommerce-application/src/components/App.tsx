import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './Header/Header';
import { ToastContainer } from 'react-toastify';
import { FC, createContext, useState, useEffect } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import MainPage from './Pages/MainPage/MainPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import CatalogPage from './Pages/CatalogPage/CatalogPage';
import { getCategories } from '../api/apiFunctions';
import { Category } from '@commercetools/platform-sdk';
import MainCatalog from './Catalog/MainCatalog';
import CategoryCatalog from './Catalog/CategoryCatalog';

export const LogInContext = createContext(false);

const App: FC = () => {
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
          >
            <Route index element={<MainCatalog categories={categories} />} />
            <Route
              path=":categoryKey"
              element={<CategoryCatalog categories={categories} />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
};

export default App;
