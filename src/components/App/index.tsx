import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ProvideAuth } from '../../services/auth';

import AppHeader from '../AppHeader';
import ProtectedRouteElement from '../ProtectedRouteElement';
import ConstructorPage from '../../pages/Constructor';
import IngredientPage from '../../pages/Ingredient';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import ProfilePage from '../../pages/Profile';
import PersonalInfoPage from '../../pages/PersonalInfo';
import OrdersPage from '../../pages/Orders';
import LoginPage from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword';

import styles from './App.module.css';

import { fetchIngredients } from '../../store/ingredients/ingredientsAsyncActions';
import { selectIngredientsOptions } from '../../store/ingredients/ingredientsSlice';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, ingredientsError } = useSelector(selectIngredientsOptions);
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeIngredientModal = () => {
    navigate(background.pathname);
  };

  return (
    <div className={styles.app}>
      {!isLoading && ingredientsError === '' && (
        <ProvideAuth>
          <AppHeader />
          <Routes location={background ?? location}>
            <Route path="/" element={<ConstructorPage />} />
            <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
              <Route path="" element={<PersonalInfoPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
            <Route path="/login" element={<ProtectedRouteElement anonymous element={<LoginPage />} />} />
            <Route path="/register" element={<ProtectedRouteElement anonymous element={<RegisterPage />} />} />
            <Route
              path="/forgot-password"
              element={<ProtectedRouteElement anonymous element={<ForgotPasswordPage />} />}
            />
            <Route
              path="/reset-password"
              element={<ProtectedRouteElement anonymous element={<ResetPasswordPage />} />}
            />
          </Routes>
          {background && (
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={
                  <Modal header="???????????? ??????????????????????" onClose={closeIngredientModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </ProvideAuth>
      )}
      {ingredientsError !== '' && (
        <div className="m-20">
          <div className="mb-10 text text_type_main-default">??????-???? ?????????? ???? ??????...</div>
          <div className="text text_type_main-small text_color_inactive">{ingredientsError}</div>
        </div>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
