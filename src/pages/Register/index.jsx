import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';
import { setUserData } from '../../services/authSlice';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRegisterClick();
    }
  };

  const handleRegisterClick = () => {
    burgerAPI
      .registerUser(name, email, password)
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
          <div className="text text_type_main-medium mb-6">Регистрация</div>
          <div className="mb-6">
            <Input
              type="text"
              onChange={onNameChange}
              value={name}
              name={'name'}
              placeholder="Имя"
              onKeyDown={handleKeyDown}
            />
          </div>
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
            <Button htmlType="button" type="primary" size="large" onClick={handleRegisterClick}>
              Зарегистрироваться
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

export default Register;
