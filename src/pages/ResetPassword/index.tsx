import { useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';
import { useForm } from '../../hooks/useForm';

import styles from '../Login/Login.module.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formValues, handleFormInputChange } = useForm({ password: '', code: '' });

  useEffect(() => {
    if (location.state?.from !== '/forgot-password') {
      navigate('/login');
    }
  }, [navigate, location.state]);

  const handleResetPasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.password === '' || formValues.code === '') {
      toast.error('Заполните все поля, пожалуйста');
      return;
    }

    burgerAPI
      .resetPassword(formValues.password, formValues.code)
      .then((result) => {
        if (result.success) {
          navigate('/login');
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <main className={styles.login}>
      <form onSubmit={handleResetPasswordSubmit}>
        <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
        <div className="mb-6">
          <PasswordInput
            onChange={handleFormInputChange}
            value={formValues.password}
            name="password"
            placeholder="Введите новый пароль"
            extraClass="mb-2"
          />
        </div>
        <div className="mb-6">
          <Input
            type="text"
            onChange={handleFormInputChange}
            value={formValues.code}
            name="code"
            placeholder="Введите код из письма"
          />
        </div>
        <div className="mb-20">
          <Button htmlType="submit" type="primary" size="large">
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
  );
};

export default ResetPassword;
