import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../services/auth';

export function ProtectedRouteElement({ element }) {
  const { getUser, ...auth } = useAuth();

  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return auth.user ? element : <Navigate to="/login" replace />;
}
