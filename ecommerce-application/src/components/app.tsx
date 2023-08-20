import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/main-page';
import LoginPage from './pages/loginPage/login-page';
import RegistrationPage from './pages/registrationPage/registration-page';
import NotFoundPage from './pages/notFoundPage/not-found-page';
import Header from './header/header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
