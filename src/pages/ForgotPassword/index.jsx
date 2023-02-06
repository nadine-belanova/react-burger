import { useState } from 'react';
import { Link } from 'react-router-dom';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
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
            />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large">
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
    </>
  );
};

export default ForgotPassword;
