import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAuth } from '../../services/auth';
import { useForm } from '../../hooks/useForm';

const PersonalInfo = () => {
  const { user } = useAuth();
  const { formValues } = useForm({ name: user.name, email: user.email, password: '' });

  return (
    <form>
      <div className="mb-6">
        <Input type="text" value={formValues.name} name="name" placeholder="Имя" disabled />
      </div>
      <div className="mb-6">
        <EmailInput value={formValues.email} name="email" isIcon={false} disabled />
      </div>
      <div>
        <PasswordInput value={formValues.password} name="password" extraClass="mb-2" disabled />
      </div>
    </form>
  );
};

export default PersonalInfo;
