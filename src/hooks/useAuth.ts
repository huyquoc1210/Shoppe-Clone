import AuthContext from 'contexts/Auth';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Auth context must be used within a Provider');
  }

  return context;
};

export default useAuth;
