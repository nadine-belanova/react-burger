import { useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { selectUserOptions } from '../../store/user/userSlice';
import { signIn } from '../../store/user/userAsyncActions';
import { useForm } from '../../hooks/useForm';

import styles from './Login.module.css';

const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userLoading, userError } = useSelector(selectUserOptions);
  const { formValues, handleFormInputChange } = useForm({ email: '', password: '' });

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.email === '' || formValues.password === '') {
      toast.error('Заполните все поля, пожалуйста');
      return;
    }

    dispatch(signIn(formValues.email, formValues.password));
  };

  useEffect(() => {
    if (!userLoading) {
      if (user) {
        navigate(location.state?.from || '/');
      }
      if (userError) {
        toast.error(userError);
      }
    }
  }, [userLoading, user, userError]);

  return (
    <main className={styles.login}>
      <form onSubmit={handleLoginSubmit}>
        <div className="text text_type_main-medium mb-6">Вход</div>
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
  );
};

export default Login;
