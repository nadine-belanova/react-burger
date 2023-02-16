import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAuth } from '../../services/auth';
import { useForm } from '../../hooks/useForm';

import styles from '../Login/Login.module.css';

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const { formValues, handleFormInputChange } = useForm({ name: '', email: '', password: '' });

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (formValues.name === '' || formValues.email === '' || formValues.password === '') {
      NotificationManager.error('Заполните все поля, пожалуйста');
      return;
    }

    registerUser(formValues.name, formValues.email, formValues.password)
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
        <form onSubmit={handleRegisterSubmit}>
          <div className="text text_type_main-medium mb-6">Регистрация</div>
          <div className="mb-6">
            <Input type="text" onChange={handleFormInputChange} value={formValues.name} name="name" placeholder="Имя" />
          </div>
          <div className="mb-6">
            <EmailInput onChange={handleFormInputChange} value={formValues.email} name="email" isIcon={false} />
          </div>
          <div className="mb-6">
            <PasswordInput
              onChange={handleFormInputChange}
              value={formValues.password}
              name="password"
              extraClass="mb-2"
            />
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
