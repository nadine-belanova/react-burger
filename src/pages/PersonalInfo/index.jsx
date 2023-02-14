import { useState } from 'react';

import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAuth } from '../../services/auth';

const PersonalInfo = () => {
  let { user } = useAuth();
  const [name] = useState(user.name);
  const [email] = useState(user.email);
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
  );
};

export default PersonalInfo;
