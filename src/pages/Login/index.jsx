import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAuth } from '../../services/auth';

import AppHeader from '../../components/AppHeader';

import styles from './Login.module.css';

const Login = () => {
  let { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    signIn(email, password)
      .then((result) => {
        if (result.success) {
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
        <form onSubmit={handleLoginClick}>
          <div className="text text_type_main-medium mb-6">Вход</div>
          <div className="mb-6">
            <EmailInput onChange={onEmailChange} value={email} name={'email'} isIcon={false} />
          </div>
          <div className="mb-6">
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} extraClass="mb-2" />
          </div>
          <div className="mb-20">
            <Button htmlType="submit" type="primary" size="large">
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
