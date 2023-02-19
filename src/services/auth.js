import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { selectUserOptions } from '../store/user/userSlice';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const { user } = useSelector(selectUserOptions);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
