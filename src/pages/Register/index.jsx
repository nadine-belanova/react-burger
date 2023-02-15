import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAuth } from '../../services/auth';

import styles from '../Login/Login.module.css';

const Register = () => {
  let { registerUser } = useAuth();
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

  const handleRegisterClick = (event) => {
    event.preventDefault();
    registerUser(name, email, password)
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
      <main className={styles.login}>
        <form onSubmit={handleRegisterClick}>
          <div className="text text_type_main-medium mb-6">Регистрация</div>
          <div className="mb-6">
            <Input type="text" onChange={onNameChange} value={name} name={'name'} placeholder="Имя" />
          </div>
          <div className="mb-6">
            <EmailInput onChange={onEmailChange} value={email} name={'email'} isIcon={false} />
          </div>
          <div className="mb-6">
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} extraClass="mb-2" />
          </div>
          <div className="mb-20">
            <Button htmlType="submit" type="primary" size="large">
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
