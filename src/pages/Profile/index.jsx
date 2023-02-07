import { useState } from 'react';

import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../../components/AppHeader';

import styles from './Profile.module.css';

const Register = () => {
  const [name] = useState('');
  const [email] = useState('');
  const [password] = useState('');

  // const onNameChange = (e) => {
  //   setName(e.target.value);
  // };
  // const onEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onPasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  return (
    <>
      <AppHeader />
      <main className={`${styles.profile} pt-30`}>
        <div className={`${styles.profileNav} ml-9 mr-15`}>
          <div className={`${styles.profileNavItem} text text_type_main-medium`}>Профиль</div>
          <div className={`${styles.profileNavItemInactive} text text_type_main-medium text_color_inactive`}>
            История заказов
          </div>
          <div className={`${styles.profileNavItemInactive} text text_type_main-medium text_color_inactive`}>Выход</div>
          <div className={`text text_type_main-default text_color_inactive mt-20`}>
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
        <form>
          <div className="mb-6">
            <Input type="text" value={name} name={'name'} placeholder="Имя" disabled />
          </div>
          <div className="mb-6">
            <EmailInput value={email} name={'email'} isIcon={false} disabled />
          </div>
          <div>
            <PasswordInput value={password} name={'password'} extraClass="mb-2" disabled />
          </div>
        </form>
      </main>
    </>
  );
};

export default Register;
