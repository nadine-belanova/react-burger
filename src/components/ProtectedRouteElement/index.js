import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../services/auth';

export function ProtectedRouteElement({ element, isForUser }) {
  let { getUser, ...auth } = useAuth();

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

  if (isForUser) {
    return auth.user ? element : <Navigate to="/login" replace />;
  }
  return auth.user ? <Navigate to="/profile/info" replace /> : element;
}
