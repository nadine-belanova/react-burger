import { useState } from 'react';
import { Link } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../../components/AppHeader';

import styles from '../Login/Login.module.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onCodeChange = (e) => {
    setCode(e.target.value);
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
            />
          </div>
          <div className="mb-6">
            <Input type="text" onChange={onCodeChange} value={code} name={'name'} placeholder="Введите код из письма" />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large">
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
    </>
  );
};

export default ResetPassword;
