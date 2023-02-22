import { useSelector } from 'react-redux';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { selectUserOptions } from '../../store/user/userSlice';
import { useForm } from '../../hooks/useForm';

const PersonalInfo = () => {
  const { user } = useSelector(selectUserOptions);
  const { formValues, handleFormInputChange } = useForm({
    name: (user && user.name) || '',
    email: (user && user.email) || '',
    password: '',
  });

  return (
    <form>
      <div className="mb-6">
        <Input
          type="text"
          value={formValues.name}
          name="name"
          placeholder="Имя"
          disabled
          onChange={handleFormInputChange}
        />
      </div>
      <div className="mb-6">
        <EmailInput value={formValues.email} name="email" isIcon={false} disabled onChange={handleFormInputChange} />
      </div>
      <div>
        <PasswordInput
          value={formValues.password}
          name="password"
          extraClass="mb-2"
          disabled
          onChange={handleFormInputChange}
        />
      </div>
    </form>
  );
};

export default PersonalInfo;
