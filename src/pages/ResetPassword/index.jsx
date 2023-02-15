import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (location.state?.from !== '/forgot-password') {
      navigate('/login');
    }
  }, [navigate, location.state]);

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleResetPasswordClick();
    }
  };

  const handleResetPasswordClick = () => {
    burgerAPI
      .resetPassword(password, code)
      .then((result) => {
        if (result.success) {
          navigate('/login');
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
          <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
          <div className="mb-6">
            <PasswordInput
              onChange={onPasswordChange}
              value={password}
              name={'password'}
              placeholder="Введите новый пароль"
              extraClass="mb-2"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              onChange={onCodeChange}
              value={code}
              name={'name'}
              placeholder="Введите код из письма"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large" onClick={handleResetPasswordClick}>
              Сохранить
            </Button>
          </div>
          <div className="mb-4">
            <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
            <Link to="/login" className={`${styles.link} text text_type_main-default ml-2`}>
              Войти
            </Link>
          </div>
        </form>
      </main>
      <NotificationContainer />
    </>
  );
};

export default ResetPassword;
