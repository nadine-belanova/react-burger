import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPasswordClick = (event) => {
    event.preventDefault();
    burgerAPI
      .sendResetPasswordCode(email)
      .then((result) => {
        if (result.success) {
          navigate('/reset-password', { state: { from: location.pathname } });
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
        <form onSubmit={handleResetPasswordClick}>
          <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
          <div className="mb-6">
            <EmailInput
              onChange={onEmailChange}
              value={email}
              name={'email'}
              placeholder="Укажите e-mail"
              isIcon={false}
            />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large" onClick={handleResetPasswordClick}>
              Восстановить
            </Button>
          </div>
          <div className="mb-4">
            <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
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

export default ForgotPassword;
