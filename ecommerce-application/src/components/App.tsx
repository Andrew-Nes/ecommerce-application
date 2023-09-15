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
import { CreateCart, getCategories } from '../api/apiFunctions';
import {
  Category,
  ClientResponse,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import BasicCatalog from './Catalog/CatalogElements/BasicCatalog';
import CategoryComponent from './Catalog/CatalogElements/CategoryComponent';
import BasicCategory from './Catalog/CategoryElements/BasicCategory';
import Subcategory from './Catalog/CategoryElements/Subcategory';
import ProductPage from './Pages/ProductPage/ProductPage';
import { serviceErrors } from '../types/formTypes';
import { reloadPage } from '../utils/apiHelpers';
import CartPage from './Pages/CartPage/CartPage';

export const LogInContext = createContext(false);

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isLoggedIn') === 'true' || false
  );

  const [basicCategories, setBasicCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [productId, setProductId] = useState<string>(
    window.localStorage.getItem('id') || 'id'
  );

  function logInStateChange(newValue: boolean): void {
    setIsLoggedIn(newValue);
    window.localStorage.setItem('isLoggedIn', newValue.toString());
  }
  async function createNewCart() {
    try {
      const cart = await CreateCart();
      window.localStorage.setItem('anonymousId', cart.body.anonymousId || '');
      window.localStorage.setItem('cartId', cart.body.id);
    } catch {
      throw new Error('crateNewCart');
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        const allCategories = response.body.results;
        const mainCategories = allCategories.filter(
          (category) => !category.parent
        );
        const childCategories = allCategories.filter(
          (category) => category.parent
        );
        setBasicCategories(mainCategories);
        setSubCategories(childCategories);
        if (!window.localStorage.getItem('cartId')) {
          createNewCart();
        }
      } catch (error) {
        const errorResponse = JSON.parse(
          JSON.stringify(error)
        ) as ClientResponse<ErrorResponse>;
        const errorCode = errorResponse.body.statusCode;
        if (errorCode === serviceErrors.INVALID_TOKEN) {
          reloadPage();
        }
      }
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
          <Route
            path="profile"
            element={<ProfilePage loginStateChange={logInStateChange} />}
          />
          <Route
            path="cart"
            element={<CartPage loginStateChange={logInStateChange} />}
          />
          <Route
            path="catalog"
            element={
              <CatalogPage
                basicCategories={basicCategories}
                subCategories={subCategories}
              />
            }
          >
            <Route
              index
              element={<BasicCatalog basicCategories={basicCategories} />}
            />
            <Route path=":currentCategoryKey" element={<CategoryComponent />}>
              <Route
                index
                element={
                  <BasicCategory
                    basicCategories={basicCategories}
                    subCategories={subCategories}
                    setProductId={setProductId}
                  />
                }
              />
              <Route
                path=":currentSubCategoryKey"
                element={
                  <Subcategory
                    mainCategories={basicCategories}
                    subCategories={subCategories}
                    setProductId={setProductId}
                  />
                }
              />
            </Route>
          </Route>
          <Route path="product" element={<ProductPage id={productId} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
};

export default App;
