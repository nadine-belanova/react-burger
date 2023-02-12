import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';
import { setUserData } from '../../services/authSlice';

import AppHeader from '../../components/AppHeader';

import styles from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLoginClick();
    }
  };

  const handleLoginClick = () => {
    burgerAPI
      .login(email, password)
      .then((result) => {
        if (result.success) {
          dispatch(setUserData(result));
          navigate('/');
        } else {
          NotificationManager.error(result.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(error.message);
      });
  };

  return (
    <>
      <AppHeader />
      <main className={styles.login}>
        <form>
          <div className="text text_type_main-medium mb-6">Вход</div>
          <div className="mb-6">
            <EmailInput
              onChange={onEmailChange}
              value={email}
              name={'email'}
              isIcon={false}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              onChange={onPasswordChange}
              value={password}
              name={'password'}
              extraClass="mb-2"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large" onClick={handleLoginClick}>
              Войти
            </Button>
          </div>
          <div className="mb-4">
            <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</span>
            <Link to="/register" className={`${styles.link} text text_type_main-default ml-2`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className="mb-4">
            <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
            <Link to="/forgot-password" className={`${styles.link} text text_type_main-default ml-2`}>
              Восстановить пароль
            </Link>
          </div>
        </form>
      </main>
      <NotificationContainer />
    </>
  );
};

export default Login;
