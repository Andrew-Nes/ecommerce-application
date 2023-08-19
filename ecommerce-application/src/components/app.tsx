import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import RegistrationPage from './pages/registration-page';
import NotFoundPage from './pages/not-found-page';
import Header from './header/header';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer/>
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
