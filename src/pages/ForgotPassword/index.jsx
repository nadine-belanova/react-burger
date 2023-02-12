import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleResetPasswordClick();
    }
  };

  const handleResetPasswordClick = () => {
    burgerAPI
      .sendResetPasswordCode(email)
      .then((result) => {
        if (result.success) {
          navigate('/reset-password');
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
            <EmailInput
              onChange={onEmailChange}
              value={email}
              name={'email'}
              placeholder="Укажите e-mail"
              isIcon={false}
              onKeyDown={handleKeyDown}
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
