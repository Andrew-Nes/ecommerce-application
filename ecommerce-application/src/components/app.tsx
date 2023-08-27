import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/main-page';
import LoginPage from './pages/loginPage/login-page';
import RegistrationPage from './pages/registrationPage/registration-page';
import NotFoundPage from './pages/notFoundPage/not-found-page';
import Header from './header/header';
import { ToastContainer } from 'react-toastify';
import { createContext, useState } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export const LogInContext = createContext(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isLoggedIn') === 'true' || false
  );
  function logInStateChange(newValue: boolean): void {
    setIsLoggedIn(newValue);
    window.localStorage.setItem('isLoggedIn', newValue.toString());
  }
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LogInContext.Provider>
  );
}

export default App;
