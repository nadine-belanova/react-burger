import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerAPI from '../../burger-api';
import { useForm } from '../../hooks/useForm';

import styles from '../Login/Login.module.css';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formValues, handleFormInputChange } = useForm({ email: '' });

  const handleResetPasswordSubmit = (event: any) => {
    event.preventDefault();

    if (formValues.email === '') {
      toast.error('Заполните все поля, пожалуйста');
      return;
    }

    burgerAPI
      .sendResetPasswordCode(formValues.email)
      .then((result) => {
        if (result.success) {
          navigate('/reset-password', { state: { from: location.pathname } });
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
          <EmailInput
            onChange={handleFormInputChange}
            value={formValues.email}
            name="email"
            placeholder="Укажите e-mail"
            isIcon={false}
          />
        </div>
        <div className="mb-20">
          <Button htmlType="submit" type="primary" size="large">
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
  );
};

export default ForgotPassword;
