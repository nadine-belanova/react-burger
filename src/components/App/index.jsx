import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProvideAuth } from '../../services/auth';

import { ProtectedRouteElement } from '../ProtectedRouteElement';
import ConstructorPage from '../../pages/Constructor';
import IngredientPage from '../../pages/Ingredient';
import ProfilePage from '../../pages/Profile';
import PersonalInfoPage from '../../pages/PersonalInfo';
import OrdersPage from '../../pages/Orders';
import LoginPage from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword';

import './App.css';

import { fetchIngredients, selectIngredientsOptions } from '../../store/ingredientsSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredientsError } = useSelector(selectIngredientsOptions);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      {!isLoading && ingredientsError === '' && (
        <ProvideAuth>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProtectedRouteElement isForUser element={<ConstructorPage />} />} />
              <Route
                path="/ingredients/:ingredientId"
                element={<ProtectedRouteElement isForUser element={<IngredientPage />} />}
              />
              <Route path="/profile" element={<ProtectedRouteElement isForUser element={<ProfilePage />} />}>
                <Route path="info" element={<PersonalInfoPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route>
              <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} />} />
              <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} />} />
              <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
              <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
            </Routes>
          </BrowserRouter>
        </ProvideAuth>
      )}
      {ingredientsError !== '' && (
        <div className="m-20">
          <div className="mb-10 text text_type_main-default">Что-то пошло не так...</div>
          <div className="text text_type_main-small text_color_inactive">{ingredientsError}</div>
        </div>
      )}
    </div>
  );
}

export default App;
